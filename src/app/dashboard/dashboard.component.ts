import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOCK_DATA } from '../mock-data';
import { Tab } from '../models';
import { TabSwitcherComponent } from '../tab-switcher/tab-switcher.component';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TabSwitcherComponent, CardListComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  tabs: Tab[] = MOCK_DATA;
  activeTabId = this.tabs[0]?.id ?? '';
  
  get activeTab() {
    return this.tabs.find(tab => tab.id === this.activeTabId);
  }

  onTabChange(tabId: string) {
    this.activeTabId = tabId;
  }
}
