import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Tab, Dashboard } from '../models';
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
  @Input({ required: true }) dashboard!: Dashboard;
  @Input() isEditing = false;

  activeTabId = '';
  tabs: Tab[] = [];

  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.activeTabId = this.route.snapshot.paramMap.get('tabId') || '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashboard']) {
      this.tabs = this.dashboard?.tabs || [];
      if (!this.activeTabId && this.tabs.length > 0) {
        this.activeTabId = this.tabs[0].id;
      }
    }
  }

  get activeTab() {
    return this.tabs.find(tab => tab.id === this.activeTabId);
  }

  onTabChange(tabId: string) {
    this.router.navigate(['/dashboard', this.dashboard.id, tabId]);
  }
}
