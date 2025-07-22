import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sensor } from '../models';
import { SensorValuePipe } from '../sensor-value.pipe';

@Component({
  selector: 'app-sensor-item',
  standalone: true,
  imports: [CommonModule, SensorValuePipe],
  templateUrl: './sensor-item.component.html',
  styleUrls: ['./sensor-item.component.scss'],
})
export class SensorItemComponent {
  @Input({ required: true }) sensor!: Sensor;
}