import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { APP_CONFIG } from '../config';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);

  let modifiedReq = req;

  // Add base URL to relative URLs when not using mock
  if (!APP_CONFIG.USE_MOCK_API && !req.url.startsWith('http')) {
    modifiedReq = req.clone({
      url: `${APP_CONFIG.API_BASE_URL}${req.url}`
    });
  }

  // Add Authorization header if token exists
  const token = tokenService.getToken();
  if (token) {
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(modifiedReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        tokenService.clearToken();
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};