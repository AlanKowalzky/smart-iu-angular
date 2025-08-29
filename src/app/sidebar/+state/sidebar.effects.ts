import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { SidebarActions, SidebarApiActions } from './sidebar.actions';

export const createDashboard$ = createEffect(
  (actions$ = inject(Actions), dashboardService = inject(DashboardService)) => {
    return actions$.pipe(
      ofType(SidebarActions.createDashboard),
      switchMap(({ dashboard }) =>
        dashboardService.createDashboard(dashboard).pipe(
          map((newDashboard) =>
            SidebarApiActions.createDashboardSuccess({ dashboard: newDashboard })
          ),
          catchError((error) =>
            of(SidebarApiActions.createDashboardFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const createDashboardSuccess$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(SidebarApiActions.createDashboardSuccess),
      tap(({ dashboard }) => {
        router.navigate(['/dashboard', dashboard.id]);
      }),
      map(() => SidebarActions.loadDashboards())
    );
  },
  { functional: true }
);

export const deleteDashboard$ = createEffect(
  (actions$ = inject(Actions), dashboardService = inject(DashboardService)) => {
    return actions$.pipe(
      ofType(SidebarActions.deleteDashboard),
      switchMap(({ dashboardId }) =>
        dashboardService.deleteDashboard(dashboardId).pipe(
          map(() =>
            SidebarApiActions.deleteDashboardSuccess({ dashboardId })
          ),
          catchError((error) =>
            of(SidebarApiActions.deleteDashboardFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const deleteDashboardSuccess$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(SidebarApiActions.deleteDashboardSuccess),
      tap(() => {
        router.navigate(['/']);
      }),
      map(() => SidebarActions.loadDashboards())
    );
  },
  { functional: true }
);
