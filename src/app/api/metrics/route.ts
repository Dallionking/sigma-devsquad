// Phase 11: Metrics Management API Routes
// /api/metrics - Manage metrics definitions and data

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Validation schemas
const createMetricSchema = z.object({
  name: z.string().min(1).max(255).regex(/^[a-zA-Z0-9_]+$/, 'Name must contain only alphanumeric characters and underscores'),
  display_name: z.string().min(1).max(255),
  description: z.string().optional(),
  calculation_method: z.enum(['sum', 'count', 'avg', 'min', 'max', 'custom']),
  data_source: z.string().min(1).max(255),
  query_config: z.record(z.any()).default({}),
  refresh_interval: z.number().int().min(60).max(86400).default(300), // 1 minute to 24 hours
  unit: z.string().max(50).optional(),
  is_active: z.boolean().default(true)
});

const updateMetricSchema = createMetricSchema.partial().omit({ name: true }); // Name can't be changed

const listMetricsSchema = z.object({
  page: z.string().transform((val) => parseInt(val) || 1),
  limit: z.string().transform((val) => Math.min(parseInt(val) || 20, 100)),
  search: z.string().optional(),
  calculation_method: z.string().optional(),
  data_source: z.string().optional(),
  is_active: z.string().transform((val) => val === 'true').optional()
});

const metricDataSchema = z.object({
  metric_names: z.array(z.string()).min(1).max(10), // Limit to 10 metrics per request
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  granularity: z.enum(['hour', 'day', 'week', 'month']).default('day'),
  aggregation: z.enum(['sum', 'avg', 'min', 'max', 'count']).optional()
});

// GET /api/metrics - List metrics with filtering
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    
    const validationResult = listMetricsSchema.safeParse(queryParams);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Invalid query parameters',
            details: validationResult.error.issues
          } 
        },
        { status: 400 }
      );
    }

    const { page, limit, search, calculation_method, data_source, is_active } = validationResult.data;
    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('metrics')
      .select(`
        id,
        name,
        display_name,
        description,
        calculation_method,
        data_source,
        query_config,
        refresh_interval,
        unit,
        is_active,
        created_by,
        created_at,
        updated_at
      `)
      .order('display_name')
      .range(offset, offset + limit - 1);

    // Apply filters
    if (search) {
      query = query.or(`display_name.ilike.%${search}%,description.ilike.%${search}%`);
    }
    
    if (calculation_method) {
      query = query.eq('calculation_method', calculation_method);
    }
    
    if (data_source) {
      query = query.eq('data_source', data_source);
    }
    
    if (is_active !== undefined) {
      query = query.eq('is_active', is_active);
    }

    const { data: metrics, error: fetchError } = await query;

    if (fetchError) {
      console.error('Database error:', fetchError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to fetch metrics' } },
        { status: 500 }
      );
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('metrics')
      .select('*', { count: 'exact', head: true });
    
    if (search) {
      countQuery = countQuery.or(`display_name.ilike.%${search}%,description.ilike.%${search}%`);
    }
    if (calculation_method) {
      countQuery = countQuery.eq('calculation_method', calculation_method);
    }
    if (data_source) {
      countQuery = countQuery.eq('data_source', data_source);
    }
    if (is_active !== undefined) {
      countQuery = countQuery.eq('is_active', is_active);
    }

    const { count: totalCount } = await countQuery;

    return NextResponse.json({
      data: metrics,
      pagination: {
        page,
        limit,
        total: totalCount || 0,
        pages: Math.ceil((totalCount || 0) / limit)
      }
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

// POST /api/metrics - Create new metric
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = createMetricSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Invalid request data',
            details: validationResult.error.issues
          } 
        },
        { status: 400 }
      );
    }

    const metricData = {
      ...validationResult.data,
      created_by: user.id
    };

    // Check if metric name already exists
    const { data: existingMetric } = await supabase
      .from('metrics')
      .select('id')
      .eq('name', metricData.name)
      .single();

    if (existingMetric) {
      return NextResponse.json(
        { error: { code: 'CONFLICT', message: 'Metric with this name already exists' } },
        { status: 409 }
      );
    }

    // Create metric
    const { data: metric, error: createError } = await supabase
      .from('metrics')
      .insert(metricData)
      .select(`
        id,
        name,
        display_name,
        description,
        calculation_method,
        data_source,
        query_config,
        refresh_interval,
        unit,
        is_active,
        created_by,
        created_at,
        updated_at
      `)
      .single();

    if (createError) {
      console.error('Create error:', createError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to create metric' } },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Metric created successfully',
        data: metric 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

// POST /api/metrics/data - Get metric data values
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  if (url.pathname !== '/api/metrics/data') {
    return new NextResponse('Not Found', { status: 404 });
  }

  try {
    const supabase = createServerComponentClient({ cookies });
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = metricDataSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Invalid request data',
            details: validationResult.error.issues
          } 
        },
        { status: 400 }
      );
    }

    const { metric_names, start_date, end_date, granularity, aggregation } = validationResult.data;

    // Get metric definitions
    const { data: metrics, error: metricsError } = await supabase
      .from('metrics')
      .select('id, name, display_name, calculation_method, data_source, query_config, unit')
      .in('name', metric_names)
      .eq('is_active', true);

    if (metricsError) {
      console.error('Metrics fetch error:', metricsError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to fetch metrics' } },
        { status: 500 }
      );
    }

    if (metrics.length === 0) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'No active metrics found with the provided names' } },
        { status: 404 }
      );
    }

    // Mock data generation for now (in real implementation, this would query actual data sources)
    const mockData = metrics.map(metric => {
      const dataPoints = [];
      const now = new Date();
      const startTime = start_date ? new Date(start_date) : new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const endTime = end_date ? new Date(end_date) : now;

      // Generate mock time series data
      const timeRange = endTime.getTime() - startTime.getTime();
      const intervals = granularity === 'hour' ? 24 : granularity === 'day' ? 7 : 30;
      const step = timeRange / intervals;

      for (let i = 0; i <= intervals; i++) {
        const timestamp = new Date(startTime.getTime() + (i * step));
        const value = Math.floor(Math.random() * 1000) + 100; // Mock values
        
        dataPoints.push({
          timestamp: timestamp.toISOString(),
          value: value
        });
      }

      return {
        metric_id: metric.id,
        metric_name: metric.name,
        display_name: metric.display_name,
        unit: metric.unit,
        calculation_method: metric.calculation_method,
        data_points: dataPoints,
        summary: {
          total: dataPoints.reduce((sum, dp) => sum + dp.value, 0),
          average: dataPoints.reduce((sum, dp) => sum + dp.value, 0) / dataPoints.length,
          min: Math.min(...dataPoints.map(dp => dp.value)),
          max: Math.max(...dataPoints.map(dp => dp.value)),
          count: dataPoints.length
        }
      };
    });

    return NextResponse.json({
      data: mockData,
      metadata: {
        start_date: start_date || new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        end_date: end_date || now.toISOString(),
        granularity,
        aggregation: aggregation || 'raw'
      }
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
