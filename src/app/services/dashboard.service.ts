import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError, map } from 'rxjs';
import { Dashboard, DashboardData } from '../models';
import { APP_CONFIG } from '../config';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  private dashboardsSubject = new BehaviorSubject<Dashboard[]>([]);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  dashboards$ = this.dashboardsSubject.asObservable();
  isLoading$ = this.isLoadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  getDashboards(): Observable<Dashboard[]> {
    const endpoint = this.config.useMockApi ? '/api/dashboards' : '/dashboards';
    
    return this.http.get<Dashboard[]>(endpoint).pipe(
      map(dashboards => dashboards.map(d => ({
        id: d.id,
        title: d.title,
        icon: d.icon
      })))
    );
  }

  getDashboardData(dashboardId: string): Observable<DashboardData> {
    const endpoint = this.config.useMockApi ? `/api/dashboards/${dashboardId}` : `/dashboards/${dashboardId}`;
    
    return this.http.get<{ tabs: unknown[] }>(endpoint).pipe(
      map(dashboard => ({ tabs: dashboard.tabs }))
    );
  }

  loadDashboards(): void {
    this.isLoadingSubject.next(true);
    this.errorSubject.next(null);

    this.getDashboards().pipe(
      tap(dashboards => {
        this.dashboardsSubject.next(dashboards);
        this.isLoadingSubject.next(false);
      }),
      catchError(err => {
        this.errorSubject.next('Failed to load dashboards');
        this.isLoadingSubject.next(false);
        return throwError(() => err);
      })
    ).subscribe();
  }
}