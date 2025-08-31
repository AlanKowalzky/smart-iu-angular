import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from '../config';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const config: AppConfig = inject(APP_CONFIG);

  if (config.useMockApi || req.url.startsWith('http')) {
    return next(req);
  }

  const apiReq = req.clone({
    url: `${config.apiBaseUrl}${req.url}`,
  });

  return next(apiReq);
};