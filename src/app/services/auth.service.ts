import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/user/login', credentials).pipe(
      tap(response => {
        this.tokenService.saveToken(response.token);
      })
    );
  }

  loadProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>('/user/profile').pipe(
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
    }
  }
}