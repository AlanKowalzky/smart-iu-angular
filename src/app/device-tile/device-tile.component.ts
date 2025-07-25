import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './device-tile.component.html',
  styleUrls: ['./device-tile.component.scss' ]
})
export class DeviceTileComponent {
  @Input() device: any; // Upewnij się, że device ma właściwość isOn (np. device.isOn)
}
