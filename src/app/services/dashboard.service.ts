import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard, Tab } from '../models';
import { APP_CONFIG } from '../config';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private config = inject(APP_CONFIG);

  get dashboardsUrl() {
    return this.config.endpoints.dashboards;
  }

  private http = inject(HttpClient);

  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(this.dashboardsUrl);
  }

  getDashboard(id: string): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.dashboardsUrl}/${id}`);
  }

  createDashboard(dashboard: Dashboard): Observable<Dashboard> {
    return this.http.post<Dashboard>(this.dashboardsUrl, dashboard);
  }

  updateDashboard(id: string, tabs: { tabs: Tab[] }): Observable<Dashboard> {
    return this.http.put<Dashboard>(`${this.dashboardsUrl}/${id}`, tabs);
  }

  deleteDashboard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.dashboardsUrl}/${id}`);
  }
}
