import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard, Tab } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = '/api/dashboards';

  constructor(private http: HttpClient) {}

  getDashboard(id: string): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.apiUrl}/${id}`);
  }

  createDashboard(dashboard: Dashboard): Observable<Dashboard> {
    return this.http.post<Dashboard>(this.apiUrl, dashboard);
  }

  updateDashboard(id: string, tabs: { tabs: Tab[] }): Observable<Dashboard> {
    return this.http.put<Dashboard>(`${this.apiUrl}/${id}`, tabs);
  }

  deleteDashboard(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
