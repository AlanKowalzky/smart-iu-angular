import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DashboardItem } from '../../models';

export const SidebarActions = createActionGroup({
  source: 'Sidebar',
  events: {
    'Load Dashboards': emptyProps(),
  },
});

export const SidebarApiActions = createActionGroup({
  source: 'Sidebar API',
  events: {
    'Load Dashboards Success': props<{ dashboards: DashboardItem[] }>(),
    'Load Dashboards Failure': props<{ error: any }>(),
  },
});
