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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmationDialog.component';
import { filter, take } from 'rxjs/operators';
import { SidebarActions } from '../sidebar/+state/sidebar.actions';
import { AddTabDialogComponent } from './add-tab-dialog/addTabDialog.component'; // New import

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TabSwitcherComponent,
    CardListComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule, // Add MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: { title: 'Confirm Deletion', message: 'Are you sure you want to delete this dashboard?' }
    });

    dialogRef.afterClosed().pipe(
      filter(result => result),
      take(1)
    ).subscribe(() => {
      this.dashboard$.pipe(
        filter(dashboard => !!dashboard),
        take(1)
      ).subscribe(dashboard => {
        if (dashboard) {
          this.store.dispatch(SidebarActions.deleteDashboard({ dashboardId: dashboard.id }));
        }
      });
    });
  }

  onAddTab(): void {
    this.dashboard$.pipe(
      filter(dashboard => !!dashboard),
      take(1)
    ).subscribe(dashboard => {
      const dialogRef = this.dialog.open(AddTabDialogComponent, {
        width: '400px',
        data: { dashboard: dashboard }
      });

      dialogRef.afterClosed().subscribe(title => {
        if (title) {
          this.store.dispatch(DashboardPageActions.addTab({ title }));
        }
      });
    });
  }

  onRemoveTab(tabId: string): void {
    this.store.dispatch(DashboardPageActions.removeTab({ tabId }));
  }

  onRenameTab(event: { tabId: string, newTitle: string }): void {
    this.store.dispatch(DashboardPageActions.renameTab(event));
  }

  onReorderTab(event: { tabId: string, direction: 'left' | 'right' }): void {
    this.store.dispatch(DashboardPageActions.reorderTab(event));
  }

  onAddCard(event: { tabId: string, layout: 'singleDevice' | 'horizontalLayout' | 'verticalLayout' }): void {
    this.store.dispatch(DashboardPageActions.addCard(event));
  }

  onRemoveCard(event: { tabId: string, cardId: string }): void {
    this.store.dispatch(DashboardPageActions.removeCard(event));
  }

  onReorderCard(event: { tabId: string, cardId: string, newIndex: number }): void {
    this.store.dispatch(DashboardPageActions.reorderCard(event));
  }
}
