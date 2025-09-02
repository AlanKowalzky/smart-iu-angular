import { Component, Input, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, CardItem, Device, Sensor } from '../models';
import { FormsModule } from '@angular/forms';
import { DeviceItemComponent } from '../device-item/deviceItem.component';
import { SensorItemComponent } from '../sensor-item/sensorItem.component';
import { Store } from '@ngrx/store';
import { DashboardPageActions } from '../dashboard-page/+state/dashboard.actions';
import { MatDialog } from '@angular/material/dialog';
import { EditCardContentDialogComponent } from '../components/edit-card-content-dialog/editCardContentDialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule, DeviceItemComponent, SensorItemComponent, MatIconModule, MatButtonModule, EditCardContentDialogComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input({ required: true }) card!: Card;
  @Input() isEditing = false; // New input for edit mode

  @Output() cardUpdated = new EventEmitter<Card>(); // New output event

  devices: Device[] = [];
  groupToggleState = false;

  private store = inject(Store);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.devices = this.card.items.filter(this.isDevice) as Device[];
    this.updateGroupToggleState();
  }

  onDeviceToggle(toggledDevice: Device): void {
    const newState = !toggledDevice.state;
    this.store.dispatch(DashboardPageActions.toggleDeviceState({ deviceId: toggledDevice.id, newState }));
    this.updateGroupToggleState();
  }

  onGroupToggleChange(): void {
    this.devices.forEach((d) => {
      if (d.state !== this.groupToggleState) {
        this.store.dispatch(DashboardPageActions.toggleDeviceState({ deviceId: d.id, newState: this.groupToggleState }));
      }
    });
  }

  openEditCardContentDialog(): void {
    const dialogRef = this.dialog.open(EditCardContentDialogComponent, {
      width: '600px',
      data: { card: this.card },
    });

    dialogRef.afterClosed().subscribe((updatedCard: Card) => {
      if (updatedCard) {
        // The dialog returns the entire updated card object
        this.cardUpdated.emit(updatedCard);
      }
    });
  }

  private updateGroupToggleState(): void {
    if (this.devices.length > 0) {
      this.groupToggleState = this.devices.some((d) => d.state);
    }
  }

  isSensor(item: CardItem): item is Sensor {
    return item.type === 'sensor';
  }

  isDevice(item: CardItem): item is Device {
    return item.type === 'device';
  }
}