import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError, map } from 'rxjs';
import { Dashboard, DashboardData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  private dashboardsSubject = new BehaviorSubject<Dashboard[]>([]);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  dashboards$ = this.dashboardsSubject.asObservable();
  isLoading$ = this.isLoadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>('/dashboards').pipe(
      map(dashboards => dashboards.map(d => ({
        id: d.id,
        title: d.title,
        icon: d.icon
      })))
    );
  }

  getDashboardData(dashboardId: string): Observable<DashboardData> {
    return this.http.get<any>(`/dashboards/${dashboardId}`).pipe(
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