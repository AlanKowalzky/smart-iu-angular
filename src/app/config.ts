import { InjectionToken } from '@angular/core';

export interface AppConfig {
  useMockApi: boolean;
  apiBaseUrl: string;
}

export const APP_DI_CONFIG: AppConfig = {
  // Backend configuration
  useMockApi: true, // Set to false to use json-server backend
  apiBaseUrl: 'http://localhost:3000', // json-server URL
};

/**
 * Injection token to provide application configuration.
 * This allows for easier mocking and dependency injection.
 */
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');