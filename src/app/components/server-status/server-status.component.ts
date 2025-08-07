import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ServerStatusService } from '../../services/server-status.service';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="server-status" [class.online]="isOnline$ | async" [class.offline]="!(isOnline$ | async)">
      <mat-icon>{{ (isOnline$ | async) ? 'dns' : 'dns_off' }}</mat-icon>
      <span>JSON Server: {{ (isOnline$ | async) ? 'ONLINE' : 'OFFLINE' }}</span>
    </div>
  `,
  styles: [`
    .server-status {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .online {
      background-color: #e8f5e8;
      color: #2e7d32;
    }
    
    .offline {
      background-color: #ffebee;
      color: #c62828;
    }
    
    mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
  `]
})
export class ServerStatusComponent {
  private serverStatusService = inject(ServerStatusService);
  
  isOnline$ = this.serverStatusService.status$;
}