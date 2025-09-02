import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Dashboard } from '../../models';
import { HttpErrorResponse } from '@angular/common/http';

export const SidebarActions = createActionGroup({
  source: 'Sidebar',
  events: {
    'Load Dashboards': emptyProps(),
    'Create Dashboard': props<{ dashboard: Dashboard }>(),
    'Delete Dashboard': props<{ dashboardId: string }>(),
  },
});

export const SidebarApiActions = createActionGroup({
  source: 'Sidebar API',
  events: {
    'Load Dashboards Success': props<{ dashboards: Dashboard[] }>(),
    'Load Dashboards Failure': props<{ error: HttpErrorResponse }>(),
    'Create Dashboard Success': props<{ dashboard: Dashboard }>(),
    'Create Dashboard Failure': props<{ error: HttpErrorResponse }>(),
    'Delete Dashboard Success': props<{ dashboardId: string }>(),
    'Delete Dashboard Failure': props<{ error: HttpErrorResponse }>(),
  },
});
