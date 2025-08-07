import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

const handleAuthError = (err: any, authService: AuthService, router: Router) => {
  if (err instanceof HttpErrorResponse && err.status === 401) {
    authService.logout();
    router.navigate(['/login']);
  }
  return throwError(() => err);
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = tokenService.getToken();

  // Do not intercept login requests
  if (req.url.includes('/api/user/login')) {
    return next(req);
  }

  if (token) {
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    return next(authReq).pipe(catchError(err => handleAuthError(err, authService, router)));
  }

  // For requests without a token, still handle potential 401s if the server sends one
  return next(req).pipe(catchError(err => handleAuthError(err, authService, router)));
};
