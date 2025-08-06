import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap, map, catchError, of } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardData } from '../models';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, DashboardComponent],
  template: `
    <div class="dashboard-page">
      <app-dashboard 
        *ngIf="dashboardData" 
        [tabs]="dashboardData.tabs"
        [activeTabId]="activeTabId">
      </app-dashboard>
      <div class="loading" *ngIf="!dashboardData && !error">
        Loading dashboard...
      </div>
      <div class="error" *ngIf="error">
        {{ error }}
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page {
      height: 100%;
      width: 100%;
    }
    
    .loading, .error {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 18px;
    }
    
    .error {
      color: #f44336;
    }
  `]
})
export class DashboardPageComponent implements OnInit {
  dashboardData: DashboardData | null = null;
  activeTabId = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        const dashboardId = params['dashboardId'];
        const tabId = params['tabId'];
        
        if (!dashboardId) {
          return this.redirectToFirstDashboard();
        }
        
        return this.dashboardService.getDashboardData(dashboardId).pipe(
          map(data => ({ data, tabId })),
          catchError(() => {
            return this.redirectToFirstDashboard();
          })
        );
      })
    ).subscribe({
      next: (result) => {
        if (result && 'data' in result) {
          this.dashboardData = result.data;
          this.activeTabId = result.tabId || this.dashboardData.tabs[0]?.id || '';
          
          
          if (result.tabId && !this.dashboardData.tabs.find(tab => tab.id === result.tabId)) {
            this.router.navigate(['/dashboard', this.route.snapshot.params['dashboardId'], this.dashboardData.tabs[0]?.id]);
          }
        }
      },
      error: (error: unknown) => {
        this.error = 'Failed to load dashboard data';
        console.error('Dashboard loading error:', error);
      }
    });
  }

  private redirectToFirstDashboard() {
    return this.dashboardService.getDashboards().pipe(
      map(dashboards => {
        if (dashboards.length > 0) {
          const firstDashboard = dashboards[0];
          this.router.navigate(['/dashboard', firstDashboard.id]);
        } else {
          this.error = "You don't have any dashboards yet. They'll appear here as soon as you create them.";
        }
        return null;
      }),
      catchError(() => {
        this.error = 'Failed to load dashboards';
        return of(null);
      })
    );
  }
}