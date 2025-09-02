import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectIsEditing = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.dashboardSnapshot !== null
);
