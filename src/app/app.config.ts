import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './interceptors/auth.interceptor';
import { mockApiInterceptor } from './interceptors/mockApi.interceptor';
import { apiInterceptor } from './interceptors/api.interceptor';
import { APP_CONFIG, APP_DI_CONFIG } from './config'; // Upewnij się, że ten import jest poprawny

export const appConfig: ApplicationConfig = {
  providers: [
    // Ta linia rejestruje konfigurację w systemie DI
    { provide: APP_CONFIG, useValue: APP_DI_CONFIG },
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptor, authInterceptor, mockApiInterceptor])),
    provideAnimations()
  ],
};
