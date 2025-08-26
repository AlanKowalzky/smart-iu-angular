import { createFeature, createReducer, on } from '@ngrx/store';
import { Dashboard } from '../../models';
import { DashboardApiActions, DashboardPageActions } from './dashboard.actions';

export interface DashboardState {
  selectedDashboard: Dashboard | null;
  originalDashboard: Dashboard | null; // Snapshot for discard functionality
  isEditing: boolean;
  isLoading: boolean;
  error: any | null;
}

export const initialState: DashboardState = {
  selectedDashboard: null,
  originalDashboard: null,
  isEditing: false,
  isLoading: false,
  error: null,
};

export const dashboardFeature = createFeature({
  name: 'dashboard',
  reducer: createReducer(
    initialState,
    on(DashboardPageActions.loadDashboard, (state) => ({
      ...state,
      isLoading: true,
      error: null,
    })),
    on(DashboardApiActions.loadDashboardSuccess, (state, { dashboard }) => ({
      ...state,
      isLoading: false,
      selectedDashboard: dashboard,
    })),
    on(DashboardApiActions.loadDashboardFailure, (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })),
    on(DashboardPageActions.enterEditMode, (state) => ({
      ...state,
      isEditing: true,
      originalDashboard: state.selectedDashboard, // Create snapshot
    })),
    on(DashboardPageActions.exitEditMode, (state) => ({
      ...state,
      isEditing: false,
      originalDashboard: null, // Clear snapshot
    })),
    on(DashboardPageActions.discardChanges, (state) => ({
      ...state,
      selectedDashboard: state.originalDashboard, // Revert from snapshot
    })),
    on(DashboardPageActions.saveDashboard, (state) => ({
        ...state,
        isLoading: true,
    })),
    on(DashboardApiActions.saveDashboardSuccess, (state, { dashboard }) => ({
        ...state,
        isLoading: false,
        selectedDashboard: dashboard,
    })),
    on(DashboardApiActions.saveDashboardFailure, (state, { error }) => ({
        ...state,
        isLoading: false,
        error,
    }))
  ),
});

export const {
    name,
    reducer,
    selectDashboardState,
    selectSelectedDashboard,
    selectIsEditing,
    selectIsLoading,
} = dashboardFeature;
