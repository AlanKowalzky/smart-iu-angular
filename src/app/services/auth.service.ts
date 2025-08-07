import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, of, catchError, map } from 'rxjs';
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
    return this.http.get<any[]>('/users').pipe(
      map(users => {
        // JSON Server zwraca wszystkich użytkowników, musimy filtrować ręcznie
        const user = users.find(u => u.userName === credentials.userName && u.password === credentials.password);
        if (user) {
          this.tokenService.saveToken(user.token);
          return { token: user.token };
        } else {
          throw { status: 401, message: 'Invalid credentials' };
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        throw error;
      })
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
      }),
      catchError(() => {
        this.logout();
        return of(); // Zwróć pusty obserwowalny, aby zakończyć strumień
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
        // Błąd jest już obsługiwany wewnątrz potoku `loadProfile`
      });
    }
  }
}