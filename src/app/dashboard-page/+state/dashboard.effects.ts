import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardApiActions, DashboardPageActions } from './dashboard.actions';
import { selectSelectedDashboard } from './dashboard.reducer';

export const loadDashboard = createEffect(
  (actions$ = inject(Actions), dashboardService = inject(DashboardService)) => {
    return actions$.pipe(
      ofType(DashboardPageActions.loadDashboard),
      switchMap(({ dashboardId }) =>
        dashboardService.getDashboard(dashboardId).pipe(
          map((dashboard) =>
            DashboardApiActions.loadDashboardSuccess({ dashboard })
          ),
          catchError((error) =>
            of(DashboardApiActions.loadDashboardFailure({ error }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const saveDashboard = createEffect(
    (actions$ = inject(Actions), store = inject(Store), dashboardService = inject(DashboardService)) => {
      return actions$.pipe(
        ofType(DashboardPageActions.saveDashboard),
        withLatestFrom(store.select(selectSelectedDashboard)),
        switchMap(([_, dashboard]) => {
            if (!dashboard) {
                return of(DashboardApiActions.saveDashboardFailure({ error: 'No dashboard selected'}));
            }
            return dashboardService.updateDashboard(dashboard.id, { tabs: dashboard.tabs }).pipe(
                map((updatedDashboard) => DashboardApiActions.saveDashboardSuccess({ dashboard: updatedDashboard })),
                catchError((error) => of(DashboardApiActions.saveDashboardFailure({ error })))
            )
        })
      );
    },
    { functional: true }
  );

  export const saveDashboardSuccess = createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DashboardApiActions.saveDashboardSuccess),
        map(() => DashboardPageActions.exitEditMode())
      );
    },
    { functional: true }
  );

  export const discardChanges = createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DashboardPageActions.discardChanges),
        map(() => DashboardPageActions.exitEditMode())
      );
    },
    { functional: true }
  );
