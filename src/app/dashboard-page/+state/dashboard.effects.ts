import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, withLatestFrom, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardApiActions, DashboardPageActions } from './dashboard.actions';
import { DashboardService } from '../../services/dashboard.service';
import { DeviceService } from '../../services/device.service';
import { Store, select } from '@ngrx/store';
import { selectSelectedDashboard } from './dashboard.reducer';
import { Router } from '@angular/router';
import { SidebarActions } from '../../sidebar/+state/sidebar.actions';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);
  private deviceService = inject(DeviceService);
  private store = inject(Store);
  private router = inject(Router);

  loadDashboard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.loadDashboard),
      switchMap(({ dashboardId }) =>
        this.dashboardService.getDashboard(dashboardId).pipe(
          map((dashboard) => DashboardApiActions.loadDashboardSuccess({ dashboard })),
          catchError((error) => of(DashboardApiActions.loadDashboardFailure({ error })))
        )
      )
    );
  });

  saveDashboard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.saveDashboard),
      withLatestFrom(this.store.pipe(select(selectSelectedDashboard))),
      concatMap(([action, dashboard]) => {
        if (!dashboard) {
          return of(DashboardApiActions.saveDashboardFailure({ error: 'No dashboard selected' }));
        }
        return this.dashboardService.updateDashboard(dashboard.id, { tabs: dashboard.tabs }).pipe(
          map((updatedDashboard) => DashboardApiActions.saveDashboardSuccess({ dashboard: updatedDashboard })),
          catchError((error) => of(DashboardApiActions.saveDashboardFailure({ error })))
        );
      })
    );
  });

  createDashboard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.createDashboard),
      concatMap(({ dashboard }) =>
        this.dashboardService.createDashboard(dashboard).pipe(
          map((newDashboard) => DashboardApiActions.createDashboardSuccess({ dashboard: newDashboard })),
          catchError((error) => of(DashboardApiActions.createDashboardFailure({ error })))
        )
      )
    );
  });

  deleteDashboard$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.deleteDashboard),
      concatMap(({ dashboardId }) =>
        this.dashboardService.deleteDashboard(dashboardId).pipe(
          map(() => DashboardApiActions.deleteDashboardSuccess({ dashboardId })),
          catchError((error) => of(DashboardApiActions.deleteDashboardFailure({ error })))
        )
      )
    );
  });

  toggleDeviceState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardPageActions.toggleDeviceState),
      concatMap(({ deviceId, newState }) =>
        this.deviceService.updateDeviceState(deviceId, newState).pipe(
          map(() => DashboardApiActions.toggleDeviceStateSuccess({ deviceId, newState })),
          catchError((error) => {
            // Revert UI state if API call fails
            // Need to get the old state from the store or action if available
            // For now, assuming oldState is available in the action or can be derived
            return of(DashboardApiActions.toggleDeviceStateFailure({ deviceId, oldState: !newState, error }));
          })
        )
      )
    );
  });

  saveDashboardSuccess = createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DashboardApiActions.saveDashboardSuccess),
        map(() => DashboardPageActions.exitEditMode())
      );
    },
    { functional: true }
  );

  discardChanges = createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(DashboardPageActions.discardChanges),
        map(() => DashboardPageActions.exitEditMode())
      );
    },
    { functional: true }
  );

  createDashboardSuccess = createEffect(
    (actions$ = inject(Actions), router = inject(Router), store = inject(Store)) => {
      return actions$.pipe(
        ofType(DashboardApiActions.createDashboardSuccess),
        map(({ dashboard }) => {
          store.dispatch(SidebarActions.loadDashboards()); // Refresh sidebar
          router.navigate(['/dashboard', dashboard.id, dashboard.tabs[0]?.id || '']); // Navigate to new dashboard
          return emptyProps(); // No further action needed from this effect
        })
      );
    },
    { functional: true }
  );

  deleteDashboardSuccess = createEffect(
    (actions$ = inject(Actions), router = inject(Router), store = inject(Store)) => {
      return actions$.pipe(
        ofType(DashboardApiActions.deleteDashboardSuccess),
        tap(() => store.dispatch(SidebarActions.loadDashboards())),
        // TODO: Navigate to the first available dashboard or home page
        map(() => {
          // For now, navigate to a default route or handle based on available dashboards
          router.navigate(['/']); // Navigate to home or a default dashboard
          return emptyProps();
        })
      );
    },
    { functional: true }
  );
}