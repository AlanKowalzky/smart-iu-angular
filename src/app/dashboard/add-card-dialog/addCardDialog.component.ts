import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AddCardDialogComponent {
  dialogRef = inject(MatDialogRef<AddCardDialogComponent>);

  selectLayout(layout: 'singleDevice' | 'horizontalLayout' | 'verticalLayout'): void {
    this.dialogRef.close(layout);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

