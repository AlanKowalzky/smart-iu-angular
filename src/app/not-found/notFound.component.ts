import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterModule],
  template: `
    <div class="not-found-container">
      <mat-card class="not-found-card">
        <mat-card-header>
          <mat-card-title>404 - Page Not Found</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>The page you're looking for doesn't exist.</p>
          <button mat-raised-button color="primary" routerLink="/">
            Go Home
          </button>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }
    
    .not-found-card {
      width: 400px;
      padding: 20px;
      text-align: center;
    }
    
    button {
      margin-top: 16px;
    }
  `]
})
export class NotFoundComponent {}