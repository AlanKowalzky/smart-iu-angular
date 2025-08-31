import { createFeature, createReducer, on } from '@ngrx/store';
import { Dashboard } from '../../models';
import { SidebarApiActions, SidebarActions } from './sidebar.actions';

export interface SidebarState {
  dashboards: Dashboard[];
  isLoading: boolean;
  error: any | null;
}

export const initialState: SidebarState = {
  dashboards: [],
  isLoading: false,
  error: null,
};

export const sidebarFeature = createFeature({
  name: 'sidebar',
  reducer: createReducer(
    initialState,
    on(SidebarActions.loadDashboards, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(SidebarApiActions.loadDashboardsSuccess, (state, { dashboards }) => ({
      ...state,
      isLoading: false,
      dashboards,
    })),
    on(SidebarApiActions.loadDashboardsFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    }))
  ),
});

export const {
    name,
    reducer,
    selectSidebarState,
    selectDashboards,
    selectIsLoading,
} = sidebarFeature;
