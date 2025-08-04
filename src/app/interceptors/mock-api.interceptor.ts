import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Mock interceptor:', req.method, req.url);
  
  // Mock login endpoint
  if (req.url.includes('/api/user/login') && req.method === 'POST') {
    console.log('Mocking login response');
    return of(new HttpResponse({
      status: 200,
      body: { token: 'mock-jwt-token-12345' }
    }));
  }

  // Mock profile endpoint
  if (req.url.includes('/api/user/profile') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: { fullName: 'John Doe', initials: 'JD' }
    }));
  }

  // Mock dashboards endpoint
  if (req.url.includes('/api/dashboards') && !req.url.includes('/api/dashboards/') && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: [
        { id: 'overview', title: 'Overview', icon: 'home' },
        { id: 'electricity', title: 'Electricity', icon: 'bolt' }
      ]
    }));
  }

  // Mock dashboard data endpoint
  if ((req.url.includes('/api/dashboards/overview') || req.url.includes('/api/dashboards/electricity')) && req.method === 'GET') {
    return of(new HttpResponse({
      status: 200,
      body: {
        tabs: [{
          id: 'overview',
          title: 'Overview',
          cards: [{
            id: 'living-room',
            title: 'Living Room',
            layout: 'verticalLayout',
            items: [
              { type: 'device', icon: 'lightbulb', label: 'Lamp', state: true },
              { type: 'sensor', icon: 'thermostat', label: 'Temperature', value: { amount: 23.5, unit: '°C' } }
            ]
          }]
        }]
      }
    }));
  }

  return next(req);
};