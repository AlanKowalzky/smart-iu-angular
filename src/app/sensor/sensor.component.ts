import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Sensor } from '../models';

@Component({
  selector: 'app-sensor',
  templateUrl: './sensor.component.html',
  styleUrls: ['./sensor.component.scss'],
  standalone: true,
  imports: [MatIconModule]
})
export class SensorComponent {
  @Input() sensor!: Sensor;
}
