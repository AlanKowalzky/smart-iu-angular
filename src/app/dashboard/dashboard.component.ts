import { Component, Input, OnChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Tab } from '../models';
import { TabSwitcherComponent } from '../tab-switcher/tabSwitcher.component';
import { CardListComponent } from '../card-list/cardList.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TabSwitcherComponent, CardListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnChanges {
  @Input() tabs: Tab[] = [];
  @Input() activeTabId = '';

  private router = inject(Router);

  ngOnChanges(): void {
    if (!this.activeTabId && this.tabs.length > 0) {
      this.activeTabId = this.tabs[0].id;
    }
  }

  get activeTab() {
    return this.tabs.find(tab => tab.id === this.activeTabId);
  }

  onTabChange(tabId: string) {
    this.activeTabId = tabId;
    const currentUrl = this.router.url;
    const urlParts = currentUrl.split('/');
    if (urlParts.length >= 3) {
      const dashboardId = urlParts[2];
      this.router.navigate(['/dashboard', dashboardId, tabId]);
    }
  }
}
