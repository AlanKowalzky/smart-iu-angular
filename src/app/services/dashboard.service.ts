import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard, Tab } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);

  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>('/api/dashboards');
  }

  getDashboard(id: string): Observable<Dashboard> {
    return this.http.get<Dashboard>(`/api/dashboards/${id}`);
  }

  updateDashboard(id: string, tabs: { tabs: Tab[] }): Observable<Dashboard> {
    return this.http.put<Dashboard>(`/api/dashboards/${id}`, tabs);
  }
}
