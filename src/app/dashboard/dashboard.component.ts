import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
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
export class DashboardComponent implements OnChanges {
  @Input() tabs: Tab[] = [];
  @Input() activeTabId = '';
  
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
  }
}
