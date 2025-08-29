import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { DashboardPageActions } from '../../dashboard-page/+state/dashboard.actions';

@Component({
  selector: 'app-add-dashboard-dialog',
  templateUrl: './add-dashboard-dialog.component.html',
  styleUrls: ['./add-dashboard-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AddDashboardDialogComponent {
  form: FormGroup;
  private store = inject(Store);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDashboardDialogComponent>,
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      icon: ['', Validators.required]
    });
  }

  private kebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const { title, icon } = this.form.value;
      const id = this.kebabCase(title);
      this.store.dispatch(DashboardPageActions.createDashboard({ dashboard: { id, title, icon, tabs: [] } }));
      this.dialogRef.close();
    }
  }
}