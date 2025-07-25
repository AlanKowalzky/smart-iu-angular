import {
  Component,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('true', style({ width: '250px' })),
      state('false', style({ width: '80px' })),
      transition('true <=> false', animate('300ms ease-in-out')),
    ]),
  ],
  standalone: true,
  imports: [MatIconModule, RouterLink, RouterLinkActive, CommonModule]
})
export class SidebarComponent { 
  isCollapsed = false;
  toggleSidebar()
  {
     this.isCollapsed = !this.isCollapsed;
     console.log('isCollapsed', this.isCollapsed);
  }
}

