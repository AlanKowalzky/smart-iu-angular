createDashboard(dashboard: Dashboard): Observable<Dashboard> {
    return this.http.post<Dashboard>('/api/dashboards', dashboard);
  }

  updateDashboard(id: string, tabs: { tabs: Tab[] }): Observable<Dashboard> {
    return this.http.put<Dashboard>(`/api/dashboards/${id}`, tabs);
  }
