import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ServerStatusComponent } from './components/server-status/serverStatus.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, ServerStatusComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'smart-home-ui';
  private authService = inject(AuthService);
  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;



  ngOnInit(): void {
    this.authService.checkAuthStatus();
  }
}
