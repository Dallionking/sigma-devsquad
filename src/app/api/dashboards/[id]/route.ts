// Phase 11: Individual Dashboard Management API Routes
// /api/dashboards/[id] - Get, update, and delete individual dashboards

import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { z } from 'zod';

// Validation schemas
const updateDashboardSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  description: z.string().optional(),
  layout_json: z.record(z.any()).optional(),
  is_default: z.boolean().optional(),
  is_public: z.boolean().optional(),
  tags: z.array(z.string()).optional()
});

// Helper function to check dashboard access
async function checkDashboardAccess(supabase: any, dashboardId: string, userId: string, permission: 'read' | 'write' = 'read') {
  const { data: dashboard, error } = await supabase
    .from('dashboards')
    .select(`
      id,
      user_id,
      title,
      is_public,
      dashboard_collaborators(permission, user_id)
    `)
    .eq('id', dashboardId)
    .single();

  if (error) {
    return { hasAccess: false, dashboard: null, error: 'Dashboard not found' };
  }

  // Owner has full access
  if (dashboard.user_id === userId) {
    return { hasAccess: true, dashboard, error: null };
  }

  // Check if user is a collaborator with appropriate permissions
  const collaborator = dashboard.dashboard_collaborators?.find(
    (collab: any) => collab.user_id === userId
  );

  if (!collaborator) {
    // Check if dashboard is public (read-only access)
    if (dashboard.is_public && permission === 'read') {
      return { hasAccess: true, dashboard, error: null };
    }
    return { hasAccess: false, dashboard: null, error: 'Access denied' };
  }

  // Check permission level
  if (permission === 'write' && collaborator.permission === 'viewer') {
    return { hasAccess: false, dashboard: null, error: 'Insufficient permissions' };
  }

  return { hasAccess: true, dashboard, error: null };
}

// GET /api/dashboards/[id] - Get dashboard details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Invalid dashboard ID format' } },
        { status: 400 }
      );
    }

    // Check access permissions
    const { hasAccess, dashboard, error: accessError } = await checkDashboardAccess(
      supabase, 
      id, 
      user.id, 
      'read'
    );

    if (!hasAccess) {
      return NextResponse.json(
        { error: { code: 'ACCESS_DENIED', message: accessError } },
        { status: 403 }
      );
    }

    // Fetch full dashboard details
    const { data: fullDashboard, error: fetchError } = await supabase
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
        dashboard_widgets(
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
              calculation_method
            )
          )
        ),
        dashboard_collaborators(
          id,
          user_id,
          permission,
          invited_at,
          accepted_at
        )
      `)
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Database error:', fetchError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to fetch dashboard' } },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: fullDashboard });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

// PUT /api/dashboards/[id] - Update dashboard
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Invalid dashboard ID format' } },
        { status: 400 }
      );
    }

    // Check write access permissions
    const { hasAccess, error: accessError } = await checkDashboardAccess(
      supabase, 
      id, 
      user.id, 
      'write'
    );

    if (!hasAccess) {
      return NextResponse.json(
        { error: { code: 'ACCESS_DENIED', message: accessError } },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = updateDashboardSchema.safeParse(body);
    
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

    const updateData = validationResult.data;

    // If setting as default, unset other defaults for this user
    if (updateData.is_default) {
      await supabase
        .from('dashboards')
        .update({ is_default: false })
        .eq('user_id', user.id)
        .eq('is_default', true)
        .neq('id', id);
    }

    // Update dashboard
    const { data: updatedDashboard, error: updateError } = await supabase
      .from('dashboards')
      .update(updateData)
      .eq('id', id)
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

    if (updateError) {
      console.error('Update error:', updateError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to update dashboard' } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Dashboard updated successfully',
      data: updatedDashboard
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

// DELETE /api/dashboards/[id] - Delete dashboard
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Invalid dashboard ID format' } },
        { status: 400 }
      );
    }

    // Check if user owns the dashboard (only owners can delete)
    const { data: dashboard, error: fetchError } = await supabase
      .from('dashboards')
      .select('id, user_id, title')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !dashboard) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Dashboard not found or access denied' } },
        { status: 404 }
      );
    }

    // Delete dashboard (cascade will handle related records)
    const { error: deleteError } = await supabase
      .from('dashboards')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Delete error:', deleteError);
      return NextResponse.json(
        { error: { code: 'DATABASE_ERROR', message: 'Failed to delete dashboard' } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Dashboard deleted successfully'
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
