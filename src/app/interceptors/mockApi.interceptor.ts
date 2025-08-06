import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { MOCK_DATA } from '../mockData';
import { APP_CONFIG } from '../config';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip mock if configured to use real backend
  if (!APP_CONFIG.USE_MOCK_API) {
    return next(req);
  }
  
  if (req.url.includes('/api/user/login') && req.method === 'POST') {
    return of(new HttpResponse({
      status: 200,
      body: { token: 'mock-jwt-token-12345' }
    }));
  }

  
  if (req.url.includes('/api/user/profile') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: { fullName: 'John Doe', initials: 'JD' }
    }));
  }

  
  if (req.url.includes('/api/dashboards') && !req.url.includes('/api/dashboards/') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: [
        { id: 'overview', title: 'Overview', icon: 'home' },
        { id: 'lights', title: 'Lights', icon: 'lightbulb' }
      ]
    }));
  }

  
  if (req.url.includes('/api/dashboards/overview') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        tabs: MOCK_DATA.overview
      }
    }));
  }

  if (req.url.includes('/api/dashboards/lights') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        tabs: MOCK_DATA.lights
      }
    }));
  }

  return next(req);
};