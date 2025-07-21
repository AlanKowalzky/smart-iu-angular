import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../models';
import { DeviceComponent } from '../device/device.component';
import { SensorComponent } from '../sensor/sensor.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, DeviceComponent, SensorComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card!: Card;
}
