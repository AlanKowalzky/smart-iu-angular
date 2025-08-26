import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Dashboard } from '../../models';

export const DashboardPageActions = createActionGroup({
  source: 'Dashboard Page',
  events: {
    'Enter Edit Mode': emptyProps(),
    'Exit Edit Mode': emptyProps(),
    'Discard Changes': emptyProps(),
    'Save Dashboard': emptyProps(),
    'Load Dashboard': props<{ dashboardId: string }>(),
  },
});

export const DashboardApiActions = createActionGroup({
  source: 'Dashboard API',
  events: {
    'Load Dashboard Success': props<{ dashboard: Dashboard }>(),
    'Load Dashboard Failure': props<{ error: any }>(),
    'Save Dashboard Success': props<{ dashboard: Dashboard }>(),
    'Save Dashboard Failure': props<{ error: any }>(),
  },
});
