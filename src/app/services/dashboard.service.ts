import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../config';
import { Dashboard, Tab } from '../models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  private get apiUrl() {
    // In a real app, you might have a more robust way to determine the base URL
    return this.config.useMockApi ? '/api' : ''; 
  }

  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>(`${this.apiUrl}/dashboards`);
  }

  getDashboard(id: string): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiUrl}/dashboards/${id}`);
  }

  updateDashboard(id: string, payload: { tabs: Tab[] }): Observable<Dashboard> {
    return this.http.put<Dashboard>(`${this.apiUrl}/dashboards/${id}`, payload);
  }
}