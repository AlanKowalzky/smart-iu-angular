import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab } from '../models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectIsEditing } from '../dashboard-page/+state/dashboard.selectors';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab-switcher',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, FormsModule],
  templateUrl: './tab-switcher.component.html',
  styleUrls: ['./tab-switcher.component.scss'],
})
export class TabSwitcherComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeTabId = '';
  @Output() tabChange = new EventEmitter<string>();
  @Output() addTab = new EventEmitter<void>();
  @Output() removeTab = new EventEmitter<string>();
  @Output() renameTab = new EventEmitter<{ tabId: string; newTitle: string }>();
  @Output() reorderTab = new EventEmitter<{ tabId: string; direction: 'left' | 'right' }>();

  private readonly store = inject(Store);
  readonly isEditing = this.store.selectSignal(selectIsEditing);

  editingTabId: string | null = null;
  newTabTitle: string = '';

  startEditing(tabId: string, currentTitle: string): void {
    this.editingTabId = tabId;
    this.newTabTitle = currentTitle;
  }

  saveRename(tabId: string): void {
    if (this.newTabTitle.trim() && this.newTabTitle !== this.tabs.find(t => t.id === tabId)?.title) {
      this.renameTab.emit({ tabId, newTitle: this.newTabTitle });
    }
    this.cancelEditing();
  }

  cancelEditing(): void {
    this.editingTabId = null;
    this.newTabTitle = '';
  }
}