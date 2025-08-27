import { Component, OnInit, inject } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { Dashboard, UserProfile } from '../models';
import { Store } from '@ngrx/store';
import { selectDashboards } from './+state/sidebar.reducer';
import { SidebarActions } from './+state/sidebar.actions';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({ width: '250px' })),
      state('false', style({ width: '80px' })),
      transition('true <=> false', animate('300ms ease-in-out')),
    ]),
  ],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    RouterLinkActive,
    CommonModule
  ]
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  private store = inject(Store);
  dashboards$ = this.store.select(selectDashboards);
  userProfile$: Observable<UserProfile | null>;

  private authService = inject(AuthService);
  private dashboardService = inject(DashboardService);
  private router = inject(Router);

  constructor() {
    this.userProfile$ = this.authService.userProfile$;
  }

  ngOnInit(): void {
    this.store.dispatch(SidebarActions.loadDashboards());
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToDashboard(dashboardId: string): void {
    // NOTE: The dashboard object from getDashboards() doesn't include tabs.
    // We must call getDashboard(id) to get the full object with tabs.
    this.dashboardService.getDashboard(dashboardId).subscribe({
      next: (data: Dashboard) => {
        // Navigate to the first tab if it exists
        const firstTabId = data.tabs && data.tabs.length > 0 ? data.tabs[0].id : undefined;
        this.router.navigate(['/dashboard', dashboardId, firstTabId]);
      },
      error: () => {
        // Fallback navigation if fetching the dashboard details fails
        this.router.navigate(['/dashboard', dashboardId]);
      }
    });
  }
}
