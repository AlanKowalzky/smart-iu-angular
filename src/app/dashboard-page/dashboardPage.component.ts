import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { selectIsEditing, selectSelectedDashboard } from './+state/dashboard.reducer';
import { DashboardPageActions } from './+state/dashboard.actions';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, DashboardComponent],
  template: `
    <div *ngIf="dashboard$ | async as dashboard">
      <div class="toolbar">
        <h2>{{ dashboard.title }}</h2>
        <div>
          <button *ngIf="!isEditing()" (click)="enterEditMode()">Edit</button>
          <button *ngIf="isEditing()" (click)="save()">Save</button>
          <button *ngIf="isEditing()" (click)="discard()">Discard</button>
          <button *ngIf="!isEditing()">Delete</button>
        </div>
      </div>
      <app-dashboard [dashboard]="dashboard" [isEditing]="isEditing()" />
    </div>
  `,
  styles: [`
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #ccc;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);

  readonly dashboard$ = this.store.select(selectSelectedDashboard);
  readonly isEditing = this.store.selectSignal(selectIsEditing);

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

  enterEditMode(): void {
    this.store.dispatch(DashboardPageActions.enterEditMode());
  }

  save(): void {
    this.store.dispatch(DashboardPageActions.saveDashboard());
  }

  discard(): void {
    this.store.dispatch(DashboardPageActions.discardChanges());
  }
}
