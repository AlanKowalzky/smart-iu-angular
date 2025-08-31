import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { DashboardPageActions } from './+state/dashboard.actions';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  template: `
    <app-dashboard />
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  constructor() {
    this.route.params.pipe(
      map(params => params['dashboardId']),
      tap(dashboardId => {
        if (dashboardId) {
          this.store.dispatch(DashboardPageActions.loadDashboard({ dashboardId }));
        }
      })
    ).subscribe();
  }
}
