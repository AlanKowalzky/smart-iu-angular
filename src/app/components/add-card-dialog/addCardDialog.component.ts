import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
})
export class AddCardDialogComponent {
  constructor(public dialogRef: MatDialogRef<AddCardDialogComponent>) {}

  selectLayout(layout: 'singleDevice' | 'horizontalLayout' | 'verticalLayout'): void {
    this.dialogRef.close(layout);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}