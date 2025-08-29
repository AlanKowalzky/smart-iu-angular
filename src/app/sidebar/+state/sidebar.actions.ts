export const SidebarActions = createActionGroup({
  source: 'Sidebar',
  events: {
    'Load Dashboards': emptyProps(),
    'Create Dashboard': props<{ dashboard: NewDashboard }>(),
    'Delete Dashboard': props<{ dashboardId: string }>(),
  },
});

export const SidebarApiActions = createActionGroup({
  source: 'Sidebar API',
  events: {
    'Load Dashboards Success': props<{ dashboards: Dashboard[] }>(),
    'Load Dashboards Failure': props<{ error: any }>(),
    'Create Dashboard Success': props<{ dashboard: Dashboard }>(),
    'Create Dashboard Failure': props<{ error: any }>(),
    'Delete Dashboard Success': props<{ dashboardId: string }>(),
    'Delete Dashboard Failure': props<{ error: any }>(),
  },
});
