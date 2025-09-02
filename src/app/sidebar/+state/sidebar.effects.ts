import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, of, tap, map } from 'rxjs';
import { DashboardPageActions } from '../../dashboard-page/+state/dashboard.actions';
import { DashboardService } from '../../services/dashboard.service';
import { SidebarActions, SidebarApiActions } from './sidebar.actions';

export const loadDashboards$ = createEffect(
  (
    actions$ = inject(Actions),
    dashboardService = inject(DashboardService)
  ) => {
    return actions$.pipe(
      ofType(SidebarActions.loadDashboards),
      concatMap(() =>
        dashboardService.getDashboards().pipe(
          map((dashboards) => SidebarApiActions.loadDashboardsSuccess({ dashboards })),
          catchError((error) => of(SidebarApiActions.loadDashboardsFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);


export const createDashboard$ = createEffect(
  (
    actions$ = inject(Actions),
    dashboardService = inject(DashboardService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(SidebarActions.createDashboard),
      concatMap(({ dashboard }) =>
        dashboardService.createDashboard(dashboard).pipe(
          concatMap((newDashboard) => [
            SidebarApiActions.createDashboardSuccess({ dashboard: newDashboard }),
            DashboardPageActions.createDashboard({ dashboard: newDashboard }),
          ]),
          catchError((error) => of(SidebarApiActions.createDashboardFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);

export const deleteDashboard$ = createEffect(
  (
    actions$ = inject(Actions),
    dashboardService = inject(DashboardService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(SidebarActions.deleteDashboard),
      concatMap(({ dashboardId }) =>
        dashboardService.deleteDashboard(dashboardId).pipe(
          concatMap(() => [
            SidebarApiActions.deleteDashboardSuccess({ dashboardId }),
            DashboardPageActions.deleteDashboard({ dashboardId }),
          ]),
          catchError((error) => of(SidebarApiActions.deleteDashboardFailure({ error })))
        )
      )
    );
  },
  { functional: true }
);
