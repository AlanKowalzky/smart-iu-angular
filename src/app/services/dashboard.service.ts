import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Dashboard, DashboardData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);

  getDashboards(): Observable<Dashboard[]> {
    return this.http.get<any[]>('/dashboards').pipe(
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
}