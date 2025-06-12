// Phase 11: Reports Management API Routes
// /api/reports - Manage scheduled reports and exports

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Validation schemas
const createReportSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  dashboard_id: z.string().uuid().optional(),
  query_json: z.record(z.any()).default({}),
  filters_json: z.record(z.any()).default({}),
  schedule: z.object({
    enabled: z.boolean().default(false),
    frequency: z.enum(['daily', 'weekly', 'monthly']).optional(),
    day_of_week: z.number().int().min(0).max(6).optional(), // 0 = Sunday
    day_of_month: z.number().int().min(1).max(31).optional(),
    hour: z.number().int().min(0).max(23).default(9),
    timezone: z.string().default('UTC')
  }).default({}),
  format: z.enum(['pdf', 'csv', 'excel', 'json']).default('pdf'),
  is_scheduled: z.boolean().default(false)
});

const updateReportSchema = createReportSchema.partial();

const listReportsSchema = z.object({
  page: z.string().transform((val) => parseInt(val) || 1),
  limit: z.string().transform((val) => Math.min(parseInt(val) || 10, 50)),
  search: z.string().optional(),
  dashboard_id: z.string().uuid().optional(),
  format: z.string().optional(),
  is_scheduled: z.string().transform((val) => val === 'true').optional()
});

const generateReportSchema = z.object({
  format: z.enum(['pdf', 'csv', 'excel', 'json']).optional(),
  filters: z.record(z.any()).optional(),
  date_range: z.object({
    start: z.string().datetime().optional(),
    end: z.string().datetime().optional()
  }).optional()
});

// GET /api/reports - List reports with filtering
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
    
    const validationResult = listReportsSchema.safeParse(queryParams);
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

    const { page, limit, search, dashboard_id, format, is_scheduled } = validationResult.data;
    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('reports')
      .select(`
        id,
        title,
        description,
        dashboard_id,
        query_json,
        filters_json,
        schedule,
        format,
        is_scheduled,
        last_generated_at,
        created_at,
        updated_at,
        dashboards(
          id,
          title
        )
      `)
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }
    
    if (dashboard_id) {
      query = query.eq('dashboard_id', dashboard_id);
    }
    
    if (format) {
      query = query.eq('format', format);
    }
    
    if (is_scheduled !== undefined) {
      query = query.eq('is_scheduled', is_scheduled);
    }

    const { data: reports, error: fetchError } = await query;

    if (fetchError) {
      console.error('Database error:', fetchError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to fetch reports' } },
        { status: 500 }
      );
    }

    // Get total count for pagination
    let countQuery = supabase
      .from('reports')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);
    
    if (search) {
      countQuery = countQuery.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }
    if (dashboard_id) {
      countQuery = countQuery.eq('dashboard_id', dashboard_id);
    }
    if (format) {
      countQuery = countQuery.eq('format', format);
    }
    if (is_scheduled !== undefined) {
      countQuery = countQuery.eq('is_scheduled', is_scheduled);
    }

    const { count: totalCount } = await countQuery;

    return NextResponse.json({
      data: reports,
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

// POST /api/reports - Create new report
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
    const validationResult = createReportSchema.safeParse(body);
    
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

    const reportData = {
      ...validationResult.data,
      user_id: user.id
    };

    // If dashboard_id is provided, verify user has access
    if (reportData.dashboard_id) {
      const { data: dashboardAccess } = await supabase
        .from('dashboards')
        .select('id')
        .or(`user_id.eq.${user.id},dashboard_collaborators.user_id.eq.${user.id}`)
        .eq('id', reportData.dashboard_id)
        .single();

      if (!dashboardAccess) {
        return NextResponse.json(
          { error: { code: 'ACCESS_DENIED', message: 'Dashboard not found or access denied' } },
          { status: 403 }
        );
      }
    }

    // Create report
    const { data: report, error: createError } = await supabase
      .from('reports')
      .insert(reportData)
      .select(`
        id,
        title,
        description,
        dashboard_id,
        query_json,
        filters_json,
        schedule,
        format,
        is_scheduled,
        last_generated_at,
        created_at,
        updated_at
      `)
      .single();

    if (createError) {
      console.error('Create error:', createError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to create report' } },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Report created successfully',
        data: report 
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

// POST /api/reports/generate - Generate report on demand
export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  if (url.pathname !== '/api/reports/generate') {
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

    // Get report ID from query parameters
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get('report_id');
    
    if (!reportId) {
      return NextResponse.json(
        { error: { code: 'MISSING_PARAMETER', message: 'report_id is required' } },
        { status: 400 }
      );
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(reportId)) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Invalid report ID format' } },
        { status: 400 }
      );
    }

    // Parse optional request body
    let generateOptions = {};
    try {
      const body = await request.json();
      const validationResult = generateReportSchema.safeParse(body);
      if (validationResult.success) {
        generateOptions = validationResult.data;
      }
    } catch {
      // Body is optional for report generation
    }

    // Get report configuration
    const { data: report, error: reportError } = await supabase
      .from('reports')
      .select(`
        id,
        title,
        description,
        dashboard_id,
        query_json,
        filters_json,
        format,
        dashboards(
          id,
          title,
          layout_json,
          dashboard_widgets(
            id,
            widget_type,
            title,
            data_source,
            config_json
          )
        )
      `)
      .eq('id', reportId)
      .eq('user_id', user.id)
      .single();

    if (reportError || !report) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Report not found or access denied' } },
        { status: 404 }
      );
    }

    // Mock report generation (in real implementation, this would generate actual reports)
    const generatedReport = {
      report_id: report.id,
      title: report.title,
      generated_at: new Date().toISOString(),
      format: (generateOptions as any).format || report.format,
      data: {
        summary: {
          total_widgets: report.dashboards?.dashboard_widgets?.length || 0,
          dashboard_title: report.dashboards?.title || 'Standalone Report',
          generation_time_ms: Math.floor(Math.random() * 2000) + 500
        },
        widgets: report.dashboards?.dashboard_widgets?.map((widget: any) => ({
          id: widget.id,
          title: widget.title,
          type: widget.widget_type,
          data_source: widget.data_source,
          // Mock data for each widget
          data_points: Array.from({ length: 10 }, (_, i) => ({
            timestamp: new Date(Date.now() - (9 - i) * 24 * 60 * 60 * 1000).toISOString(),
            value: Math.floor(Math.random() * 1000) + 100
          }))
        })) || [],
        filters_applied: {
          ...report.filters_json,
          ...(generateOptions as any).filters
        },
        date_range: (generateOptions as any).date_range || {
          start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          end: new Date().toISOString()
        }
      },
      download_url: `/api/reports/${report.id}/download?token=${Date.now()}`, // Mock download URL
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    };

    // Update last generated timestamp
    await supabase
      .from('reports')
      .update({ last_generated_at: new Date().toISOString() })
      .eq('id', report.id);

    return NextResponse.json({
      message: 'Report generated successfully',
      data: generatedReport
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
