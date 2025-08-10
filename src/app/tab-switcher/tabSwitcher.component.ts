import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tab } from '../models';

@Component({
  selector: 'app-tab-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab-switcher.component.html',
  styleUrls: ['./tab-switcher.component.scss'],
})
export class TabSwitcherComponent {
  @Input() tabs: Tab[] = [];
  @Input() activeTabId = '';
  @Output() tabChange = new EventEmitter<string>();
}