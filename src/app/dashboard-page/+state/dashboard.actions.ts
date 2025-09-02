import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Dashboard, CardItem } from '../../models';

export const DashboardPageActions = createActionGroup({
  source: 'Dashboard Page',
  events: {
    'Enter Edit Mode': emptyProps(),
    'Exit Edit Mode': emptyProps(),
    'Discard Changes': emptyProps(),
    'Save Dashboard': emptyProps(),
    'Load Dashboard': props<{ dashboardId: string }>(),
    'Create Dashboard': props<{ dashboard: Dashboard }>(),
    'Delete Dashboard': props<{ dashboardId: string }>(),
    'Add Tab': props<{ title: string }>(),
    'Remove Tab': props<{ tabId: string }>(),
    'Rename Tab': props<{ tabId: string, newTitle: string }>(),
    'Reorder Tab': props<{ tabId: string, direction: 'left' | 'right' }>(),
    'Add Card': props<{ tabId: string, layout: 'singleDevice' | 'horizontalLayout' | 'verticalLayout' }>(),
    'Remove Card': props<{ tabId: string, cardId: string }>(),
    'Reorder Card': props<{ tabId: string, cardId: string, newIndex: number }>(),
    'Add Item To Card': props<{ tabId: string, cardId: string, item: CardItem }>(),
    'Remove Item From Card': props<{ tabId: string, cardId: string, itemId: string }>(),
    'Toggle Device State': props<{ deviceId: string, newState: boolean }>(),
  },
});

export const DashboardApiActions = createActionGroup({
  source: 'Dashboard API',
  events: {
    'Load Dashboard Success': props<{ dashboard: Dashboard }>(),
    'Load Dashboard Failure': props<{ error: any }>(),
    'Save Dashboard Success': props<{ dashboard: Dashboard }>(),
    'Save Dashboard Failure': props<{ error: any }>(),
    'Create Dashboard Success': props<{ dashboard: Dashboard }>(),
    'Create Dashboard Failure': props<{ error: any }>(),
    'Delete Dashboard Success': props<{ dashboardId: string }>(),
    'Delete Dashboard Failure': props<{ error: any }>(),
    'Toggle Device State Success': props<{ deviceId: string, newState: boolean }>(),
    'Toggle Device State Failure': props<{ deviceId: string, oldState: boolean, error: any }>(),
  },
});
