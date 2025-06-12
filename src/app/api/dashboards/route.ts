// Phase 11: Dashboard Management API Routes
// /api/dashboards - List and create dashboards

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Validation schemas
const createDashboardSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  layout_json: z.record(z.any()).default({}),
  is_default: z.boolean().default(false),
  is_public: z.boolean().default(false),
  tags: z.array(z.string()).default([])
});

const listDashboardsSchema = z.object({
  page: z.string().transform((val) => parseInt(val) || 1),
  limit: z.string().transform((val) => Math.min(parseInt(val) || 10, 100)),
  search: z.string().optional(),
  tags: z.string().optional(),
  is_public: z.string().transform((val) => val === 'true').optional()
});

// GET /api/dashboards - List dashboards with filtering and pagination
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
    
    const validationResult = listDashboardsSchema.safeParse(queryParams);
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

    const { page, limit, search, tags, is_public } = validationResult.data;
    const offset = (page - 1) * limit;

    // Build query
    let query = supabase
      .from('dashboards')
      .select(`
        id,
        title,
        description,
        layout_json,
        is_default,
        is_public,
        tags,
        created_at,
        updated_at,
        dashboard_widgets(id, widget_type, title),
        dashboard_collaborators(
          id,
          permission,
          user_id,
          invited_at,
          accepted_at
        )
      `)
      .or(`user_id.eq.${user.id},dashboard_collaborators.user_id.eq.${user.id}`)
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (search) {
      query = query.ilike('title', `%${search}%`);
    }
    
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query = query.overlaps('tags', tagArray);
    }
    
    if (is_public !== undefined) {
      query = query.eq('is_public', is_public);
    }

    const { data: dashboards, error: fetchError, count } = await query;

    if (fetchError) {
      console.error('Database error:', fetchError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to fetch dashboards' } },
        { status: 500 }
      );
    }

    // Get total count for pagination
    const { count: totalCount } = await supabase
      .from('dashboards')
      .select('*', { count: 'exact', head: true })
      .or(`user_id.eq.${user.id},dashboard_collaborators.user_id.eq.${user.id}`);

    return NextResponse.json({
      data: dashboards,
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

// POST /api/dashboards - Create new dashboard
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
    const validationResult = createDashboardSchema.safeParse(body);
    
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

    const dashboardData = {
      ...validationResult.data,
      user_id: user.id
    };

    // If this is set as default, unset other defaults for this user
    if (dashboardData.is_default) {
      await supabase
        .from('dashboards')
        .update({ is_default: false })
        .eq('user_id', user.id)
        .eq('is_default', true);
    }

    // Create dashboard
    const { data: dashboard, error: createError } = await supabase
      .from('dashboards')
      .insert(dashboardData)
      .select(`
        id,
        title,
        description,
        layout_json,
        is_default,
        is_public,
        tags,
        created_at,
        updated_at
      `)
      .single();

    if (createError) {
      console.error('Create error:', createError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to create dashboard' } },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Dashboard created successfully',
        data: dashboard 
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
