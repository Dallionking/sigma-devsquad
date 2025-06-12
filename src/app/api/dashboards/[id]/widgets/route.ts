// Phase 11: Dashboard Widgets Management API Routes
// /api/dashboards/[id]/widgets - Manage widgets within a dashboard

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Validation schemas
const createWidgetSchema = z.object({
  widget_type: z.enum(['chart', 'metric', 'table', 'text']),
  title: z.string().min(1).max(255),
  data_source: z.string().min(1).max(100),
  config_json: z.record(z.any()).default({}),
  position_x: z.number().int().min(0).default(0),
  position_y: z.number().int().min(0).default(0),
  width: z.number().int().min(1).default(4),
  height: z.number().int().min(1).default(3),
  is_visible: z.boolean().default(true),
  metric_ids: z.array(z.string().uuid()).optional() // For linking metrics
});

const updateWidgetSchema = createWidgetSchema.partial();

const batchUpdateSchema = z.object({
  widgets: z.array(z.object({
    id: z.string().uuid(),
    position_x: z.number().int().min(0).optional(),
    position_y: z.number().int().min(0).optional(),
    width: z.number().int().min(1).optional(),
    height: z.number().int().min(1).optional(),
    is_visible: z.boolean().optional()
  }))
});

// Helper function to check dashboard write access
async function checkDashboardWriteAccess(supabase: any, dashboardId: string, userId: string) {
  const { data: dashboard, error } = await supabase
    .from('dashboards')
    .select(`
      id,
      user_id,
      dashboard_collaborators(permission, user_id)
    `)
    .eq('id', dashboardId)
    .single();

  if (error) {
    return { hasAccess: false, error: 'Dashboard not found' };
  }

  // Owner has full access
  if (dashboard.user_id === userId) {
    return { hasAccess: true, error: null };
  }

  // Check if user is a collaborator with write permissions
  const collaborator = dashboard.dashboard_collaborators?.find(
    (collab: any) => collab.user_id === userId
  );

  if (!collaborator || collaborator.permission === 'viewer') {
    return { hasAccess: false, error: 'Insufficient permissions' };
  }

  return { hasAccess: true, error: null };
}

// GET /api/dashboards/[id]/widgets - List widgets in dashboard
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: dashboardId } = await params;
    const supabase = createServerComponentClient({ cookies });
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(dashboardId)) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Invalid dashboard ID format' } },
        { status: 400 }
      );
    }

    // Check dashboard access (read access is sufficient for viewing widgets)
    const { data: dashboardAccess } = await supabase
      .from('dashboards')
      .select('id')
      .or(`user_id.eq.${user.id},dashboard_collaborators.user_id.eq.${user.id},is_public.eq.true`)
      .eq('id', dashboardId)
      .single();

    if (!dashboardAccess) {
      return NextResponse.json(
        { error: { code: 'ACCESS_DENIED', message: 'Dashboard not found or access denied' } },
        { status: 403 }
      );
    }

    // Fetch widgets with their metrics
    const { data: widgets, error: fetchError } = await supabase
      .from('dashboard_widgets')
      .select(`
        id,
        widget_type,
        title,
        data_source,
        config_json,
        position_x,
        position_y,
        width,
        height,
        is_visible,
        created_at,
        updated_at,
        widget_metrics(
          id,
          metric_id,
          aggregation_method,
          filters_json,
          metrics(
            id,
            name,
            display_name,
            description,
            unit,
            calculation_method,
            refresh_interval
          )
        )
      `)
      .eq('dashboard_id', dashboardId)
      .order('position_y')
      .order('position_x');

    if (fetchError) {
      console.error('Database error:', fetchError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to fetch widgets' } },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: widgets });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

// POST /api/dashboards/[id]/widgets - Create new widget
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: dashboardId } = await params;
    const supabase = createServerComponentClient({ cookies });
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(dashboardId)) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Invalid dashboard ID format' } },
        { status: 400 }
      );
    }

    // Check dashboard write access
    const { hasAccess, error: accessError } = await checkDashboardWriteAccess(
      supabase, 
      dashboardId, 
      user.id
    );

    if (!hasAccess) {
      return NextResponse.json(
        { error: { code: 'ACCESS_DENIED', message: accessError } },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = createWidgetSchema.safeParse(body);
    
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

    const { metric_ids, ...widgetData } = validationResult.data;

    // Create widget
    const { data: widget, error: createError } = await supabase
      .from('dashboard_widgets')
      .insert({
        ...widgetData,
        dashboard_id: dashboardId
      })
      .select(`
        id,
        widget_type,
        title,
        data_source,
        config_json,
        position_x,
        position_y,
        width,
        height,
        is_visible,
        created_at,
        updated_at
      `)
      .single();

    if (createError) {
      console.error('Create error:', createError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to create widget' } },
        { status: 500 }
      );
    }

    // Link metrics if provided
    if (metric_ids && metric_ids.length > 0) {
      const metricLinks = metric_ids.map(metricId => ({
        widget_id: widget.id,
        metric_id: metricId
      }));

      const { error: linkError } = await supabase
        .from('widget_metrics')
        .insert(metricLinks);

      if (linkError) {
        console.error('Metric link error:', linkError);
        // Don't fail the widget creation, just log the error
      }
    }

    return NextResponse.json(
      { 
        message: 'Widget created successfully',
        data: widget 
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

// PUT /api/dashboards/[id]/widgets - Batch update widget positions and properties
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: dashboardId } = await params;
    const supabase = createServerComponentClient({ cookies });
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required' } },
        { status: 401 }
      );
    }

    // Check dashboard write access
    const { hasAccess, error: accessError } = await checkDashboardWriteAccess(
      supabase, 
      dashboardId, 
      user.id
    );

    if (!hasAccess) {
      return NextResponse.json(
        { error: { code: 'ACCESS_DENIED', message: accessError } },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = batchUpdateSchema.safeParse(body);
    
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

    const { widgets } = validationResult.data;

    // Update each widget
    const updatePromises = widgets.map(async (widgetUpdate) => {
      const { id, ...updateData } = widgetUpdate;
      
      return supabase
        .from('dashboard_widgets')
        .update(updateData)
        .eq('id', id)
        .eq('dashboard_id', dashboardId); // Ensure widget belongs to this dashboard
    });

    const results = await Promise.all(updatePromises);
    
    // Check for any errors
    const errors = results.filter(result => result.error);
    if (errors.length > 0) {
      console.error('Batch update errors:', errors);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to update some widgets' } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: `Successfully updated ${widgets.length} widgets`
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
