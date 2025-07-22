import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardItem, Device, Sensor } from '../models';
import { FormsModule } from '@angular/forms';
import { SensorValuePipe } from '../sensor-value.pipe';
import { ActiveDeviceDirective } from '../active-device.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule, SensorValuePipe, ActiveDeviceDirective],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input({ required: true }) card!: Card;

  devices: Device[] = [];
  groupToggleState = false;

  ngOnInit(): void {
    this.devices = this.card.items.filter(this.isDevice) as Device[];
    this.updateGroupToggleState();
  }

  onDeviceToggle(toggledDevice: Device): void {
    toggledDevice.state = !toggledDevice.state;
    this.updateGroupToggleState();
  }

  onGroupToggleChange(): void {
    this.devices.forEach((d) => (d.state = this.groupToggleState));
  }

  private updateGroupToggleState(): void {
    if (this.devices.length > 0) {
      this.groupToggleState = this.devices.every((d) => d.state);
    }
  }

  // Type guards for cleaner templates
  isSensor(item: CardItem): item is Sensor {
    return item.type === 'sensor';
  }

  isDevice(item: CardItem): item is Device {
    return item.type === 'device';
  }
}