import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Tab, Dashboard } from '../models';
import { TabSwitcherComponent } from '../tab-switcher/tabSwitcher.component';
import { CardListComponent } from '../card-list/cardList.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectIsEditing, selectSelectedDashboard } from '../dashboard-page/+state/dashboard.reducer';
import { DashboardPageActions } from '../dashboard-page/+state/dashboard.actions';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TabSwitcherComponent,
    CardListComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly destroy$ = new Subject<void>();

  readonly dashboard$ = this.store.select(selectSelectedDashboard);
  readonly isEditing = this.store.selectSignal(selectIsEditing);

  activeTabId?: string;

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.activeTabId = params.get('tabId') ?? undefined;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onTabChange(dashboard: Dashboard, tabId: string) {
    this.router.navigate(['/dashboard', dashboard.id, tabId]);
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

  deleteDashboard(): void {
    // TODO: Implement confirmation dialog and dispatch delete action
    console.log('Delete dashboard clicked');
  }
}
