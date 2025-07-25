import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Device } from '../models';
import { FormsModule } from '@angular/forms';
import { ActiveDeviceDirective } from '../active-device.directive';

@Component({
  selector: 'app-device-item',
  standalone: true,
  imports: [CommonModule, FormsModule, ActiveDeviceDirective],
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss'],
})
export class DeviceItemComponent {
  @Input({ required: true }) device!: Device;
  @Output() toggle = new EventEmitter<void>();

  onToggle(): void {
    this.toggle.emit();
  }
}