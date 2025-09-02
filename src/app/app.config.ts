import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './interceptors/auth.interceptor';
import { mockApiInterceptor } from './interceptors/mockApi.interceptor';
import { apiInterceptor } from './interceptors/api.interceptor';
import { APP_CONFIG, APP_DI_CONFIG } from './config';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { DashboardEffects } from './dashboard-page/+state/dashboard.effects';
import { loadDashboards$, createDashboard$, deleteDashboard$ } from './sidebar/+state/sidebar.effects';
import { dashboardFeatureKey, dashboardReducer } from './dashboard-page/+state/dashboard.reducer';
import { sidebarFeature } from './sidebar/+state/sidebar.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
    provideRouter(routes),
    provideHttpClient(withInterceptors([mockApiInterceptor, apiInterceptor, authInterceptor])),
    provideAnimations(),
    provideStore(),
    provideState(dashboardFeatureKey, dashboardReducer),
    provideState(sidebarFeature.name, sidebarFeature.reducer),
    provideEffects(DashboardEffects, { loadDashboards$, createDashboard$, deleteDashboard$ })
  ],
};