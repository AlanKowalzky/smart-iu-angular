import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, interval, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerStatusService {
  private http = inject(HttpClient);
  private statusSubject = new BehaviorSubject<boolean>(false);
  
  status$ = this.statusSubject.asObservable();

  constructor() {
    this.checkServerStatus();
    // Sprawdzaj co 30 sekund
    interval(30000).subscribe(() => this.checkServerStatus());
  }

  private checkServerStatus(): void {
    this.http.get('/users').pipe(
      catchError(() => of(null))
    ).subscribe({
      next: (response) => {
        this.statusSubject.next(response !== null);
      },
      error: () => {
        this.statusSubject.next(false);
      }
    });
  }
}