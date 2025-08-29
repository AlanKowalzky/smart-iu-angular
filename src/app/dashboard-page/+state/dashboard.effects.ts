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

  export const createDashboardSuccess = createEffect(
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
