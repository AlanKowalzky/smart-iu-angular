import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { SidebarActions, SidebarApiActions } from './sidebar.actions';

export const loadDashboards = createEffect(
  (actions$ = inject(Actions), dashboardService = inject(DashboardService)) => {
    return actions$.pipe(
      ofType(SidebarActions.loadDashboards),
      switchMap(() =>
        dashboardService.getDashboards().pipe(
          map((dashboards) =>
            SidebarApiActions.loadDashboardsSuccess({ dashboards })
          ),
          catchError((error) =>
            of(SidebarApiActions.loadDashboardsFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);
