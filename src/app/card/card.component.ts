import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models';
import { DeviceComponent } from '../device/device.component';
import { SensorComponent } from '../sensor/sensor.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, DeviceComponent, SensorComponent, MatSlideToggleModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: Card;

  get hasGroupSwitch(): boolean {
    return this.card.items.filter(i => i.type === 'device').length > 1;
  }

  get groupSwitchState(): boolean {
    return this.card.items
      .filter(i => i.type === 'device')
      .some((d: any) => d.state);
  }

  onGroupSwitchChange(state: boolean) {
    this.card.items
      .filter(i => i.type === 'device')
      .forEach((d: any) => d.state = state);
  }
}
