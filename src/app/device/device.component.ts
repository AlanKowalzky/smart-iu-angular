import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Device } from '../models';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent {
  @Input() device!: Device;
}
