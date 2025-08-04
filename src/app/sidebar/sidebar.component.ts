import { Component, OnInit } from '@angular/core';
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
  dashboards: Dashboard[] = [];
  userProfile$: Observable<UserProfile | null>;
  
  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.userProfile$ = this.authService.userProfile$;
  }

  ngOnInit(): void {
    this.loadDashboards();
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  loadDashboards(): void {
    this.dashboardService.getDashboards().subscribe({
      next: (dashboards) => {
        this.dashboards = dashboards;
      },
      error: (error) => {
        console.error('Failed to load dashboards:', error);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

