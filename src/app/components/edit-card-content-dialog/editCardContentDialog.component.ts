import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Card, CardItem, Device, Sensor } from '../../models';
import { DeviceService } from '../../services/device.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatDialogModule } from '@angular/material/dialog';

export interface EditCardContentDialogData {
  card: Card;
}

@Component({
  selector: 'app-edit-card-content-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
  ],
  templateUrl: './edit-card-content-dialog.component.html',
  styleUrls: ['./edit-card-content-dialog.component.scss'],
})
export class EditCardContentDialogComponent implements OnInit {
  form: FormGroup;
  currentCard: Card;
  availableEntities$: Observable<CardItem[]> = of([]);

  private fb = inject(FormBuilder);
  private deviceService = inject(DeviceService);
  dialogRef = inject(MatDialogRef<EditCardContentDialogComponent>);
  data = inject<EditCardContentDialogData>(MAT_DIALOG_DATA);

  constructor() {
    this.currentCard = { ...this.data.card }; // Create a shallow copy to work with
    this.form = this.fb.group({
      title: [this.currentCard.title || ''],
      selectedEntity: [null],
    });
  }

  ngOnInit(): void {
    this.deviceService.getDevices().pipe(
      map(devices => devices.filter(device => !this.currentCard.items.some(item => item.id === device.id)))
    ).subscribe(entities => {
      this.availableEntities$ = of(entities);
    });
  }

  removeItem(itemId: string): void {
    this.currentCard.items = this.currentCard.items.filter((item) => item.id !== itemId);
  }

  addSelectedItem(): void {
    const selectedEntity = this.form.get('selectedEntity')?.value;
    if (selectedEntity) {
      this.currentCard.items.push(selectedEntity);
      this.form.get('selectedEntity')?.setValue(null);
      // Re-filter available entities after adding one
      this.deviceService.getDevices().pipe(
        map(devices => devices.filter(device => !this.currentCard.items.some(item => item.id === device.id)))
      ).subscribe(entities => {
        this.availableEntities$ = of(entities);
      });
    }
  }

  onSave(): void {
    if (this.form.valid) {
      this.currentCard.title = this.form.get('title')?.value;
      this.dialogRef.close(this.currentCard); // Return the updated card
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  isSensor(item: CardItem): item is Sensor {
    return item.type === 'sensor';
  }

  isDevice(item: CardItem): item is Device {
    return item.type === 'device';
  }
}

