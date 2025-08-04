import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard, DashboardData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<Dashboard[]>('/dashboards');
  }

  getDashboardData(dashboardId: string): Observable<DashboardData> {
    return this.http.get<DashboardData>(`/dashboards/${dashboardId}`);
  }
}