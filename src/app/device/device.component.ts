import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Device } from '../models';
import { CommonModule } from '@angular/common';
import { ActiveDeviceDirective } from '../activeDevice.directive';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatSlideToggleModule, ActiveDeviceDirective],
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent {
  @Input() device!: Device;
  @Input() useSwitch = false; // czy pokazać przełącznik
  @Output() stateChange = new EventEmitter<boolean>();

  toggleDevice() {
    this.stateChange.emit(!this.device.state);
  }
}
