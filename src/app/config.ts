import { InjectionToken } from '@angular/core';

export interface AppConfig {
  useMockApi: boolean;
  apiBaseUrl: string;
  endpoints: {
    dashboards: string;
    users: string;
    login: string;
    profile: string;
  };
}

export const APP_DI_CONFIG: AppConfig = {
  useMockApi: false,
  apiBaseUrl: 'http://localhost:3000',
  endpoints: {
    // JSON Server endpoints (current)
    dashboards: '/dashboards',
    users: '/users',
    login: '/users', // JSON Server uses /users for login
    profile: '/users', // JSON Server uses /users for profile
    
    // Future API endpoints (uncomment when switching to real backend)
    // dashboards: '/api/v1/dashboards',
    // users: '/api/v1/users',
    // login: '/api/v1/auth/login',
    // profile: '/api/v1/auth/profile',
  },
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');