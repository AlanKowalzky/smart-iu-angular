import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { LoginRequest, LoginResponse, UserProfile } from '../models';
import { TokenService } from './token.service';

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

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.get<any[]>('/users', {
      params: {
        userName: credentials.userName,
        password: credentials.password
      }
    }).pipe(
      tap(users => {
        if (users.length > 0) {
          this.tokenService.saveToken(users[0].token);
        } else {
          throw new Error('Invalid credentials');
        }
      }),
      map(users => ({ token: users[0].token }))
    );
  }

  loadProfile(): Observable<UserProfile> {
    return this.http.get<any[]>('/users', {
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
      })
    );
  }

  logout(): void {
    this.tokenService.clearToken();
    this.isAuthenticatedSubject.next(false);
    this.userProfileSubject.next(null);
  }

  checkAuthStatus(): void {
    if (this.tokenService.hasToken()) {
      this.loadProfile().subscribe({
        error: () => {
          this.logout();
        }
      });
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }
}