import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { MOCK_DATA } from '../mockData';
import { APP_CONFIG } from '../config';
import { LoginRequest } from '../models';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(APP_CONFIG);
  if (!config.useMockApi) {
    return next(req);
  }

  if (req.url.endsWith('/api/auth/login') && req.method === 'POST') {
    const { userName, password } = req.body as LoginRequest;
    if (userName === 'admin' && password === 'admin') {
      return of(new HttpResponse({ status: 200, body: { token: 'mock-jwt-token-12345' } }));
    }
    return of(new HttpResponse({ status: 401, statusText: 'Invalid credentials' }));
  }

  
  if (req.url.endsWith('/api/auth/profile') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: { fullName: 'John Doe', initials: 'JD' }
    }));
  }

  
  if (req.url.endsWith('/dashboards') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: [
        { id: 'overview', title: 'Overview', icon: 'home' },
        { id: 'lights', title: 'Lights', icon: 'lightbulb' }
      ]
    }));
  }

  if (req.url.endsWith('/dashboards/overview') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        tabs: MOCK_DATA.overview
      }
    }));
  }

  if (req.url.endsWith('/dashboards/lights') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        tabs: MOCK_DATA.lights
      }
    }));
  }

  return next(req);
};