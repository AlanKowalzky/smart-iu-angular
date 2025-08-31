import { InjectionToken } from '@angular/core';

export interface AppConfig {
  useMockApi: boolean;
  apiBaseUrl: string;
}

export const APP_DI_CONFIG: AppConfig = {
  useMockApi: true,
  apiBaseUrl: 'http://localhost:3000',
};
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');