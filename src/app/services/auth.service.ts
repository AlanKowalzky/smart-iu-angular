import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of, catchError, map } from 'rxjs';
import { LoginRequest, LoginResponse, UserProfile } from '../models';
import { TokenService } from './token.service';
import { APP_CONFIG } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  userProfile$ = this.userProfileSubject.asObservable();

  private http = inject(HttpClient);
  private tokenService = inject(TokenService);
  private config = inject(APP_CONFIG);

  login(credentials: LoginRequest): Observable<LoginResponse> {
    if (this.config.useMockApi) {
      return this.http.post<LoginResponse>('/api/auth/login', credentials).pipe(
        tap(response => {
          this.tokenService.saveToken(response.token);
        }),
        catchError(error => {
          throw error;
        })
      );
    } else {
      return this.http.get<{ userName: string; password: string; token: string }[]>(this.config.endpoints.login).pipe(
        map(users => {
          const user = users.find(u => u.userName === credentials.userName && u.password === credentials.password);
          if (user) {
            this.tokenService.saveToken(user.token);
            return { token: user.token };
          } else {
            throw { status: 401, message: 'Invalid credentials' };
          }
        }),
        catchError(error => {
          throw error;
        })
      );
    }
  }

  loadProfile(): Observable<UserProfile> {
    if (this.config.useMockApi) {
      return this.http.get<UserProfile>('/api/auth/profile').pipe(
        tap(profile => {
          this.userProfileSubject.next(profile);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(() => {
          this.logout();
          return of();
        })
      );
    } else {
      return this.http.get<{ fullName: string; initials: string }[]>(this.config.endpoints.profile, {
        params: { token: this.tokenService.getToken() || '' }
      }).pipe(
        map(users => {
          if (users.length > 0) {
            return { fullName: users[0].fullName, initials: users[0].initials };
          }
          throw new Error('User not found');
        }),
        tap(profile => {
          this.userProfileSubject.next(profile);
          this.isAuthenticatedSubject.next(true);
        }),
        catchError(() => {
          this.logout();
          return of();
        })
      );
    }
  }

  logout(): void {
    this.tokenService.clearToken();
    this.isAuthenticatedSubject.next(false);
    this.userProfileSubject.next(null);
  }

  checkAuthStatus(): void {
    if (this.tokenService.hasToken()) {
      this.loadProfile().subscribe();
    }
  }
}