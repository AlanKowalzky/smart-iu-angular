import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard/:dashboardId/:tabId', 
    component: DashboardPageComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'dashboard/:dashboardId', 
    component: DashboardPageComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'dashboard', 
    component: DashboardPageComponent,
    canActivate: [authGuard]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];
