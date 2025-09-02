import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { Dashboard } from '../../models';
import { selectDashboards } from '../+state/sidebar.reducer';

@Component({
  selector: 'app-add-dashboard-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-dashboard-dialog.component.html',
  styleUrls: ['./add-dashboard-dialog.component.scss'],
})
export class AddDashboardDialogComponent implements OnInit {
  addDashboardForm!: FormGroup;
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddDashboardDialogComponent>);
  private store = inject(Store);
  private existingDashboardIds$: Observable<string[]>;

  constructor() {
    this.existingDashboardIds$ = this.store.select(selectDashboards).pipe(
      map(dashboards => dashboards.map(d => d.id))
    );
  }

  ngOnInit(): void {
    this.addDashboardForm = this.fb.group({
      id: [
        '',
        [Validators.required, Validators.maxLength(30)],
        [this.validateDashboardIdUnique.bind(this)],
      ],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      icon: ['', Validators.required],
    });
  }

  validateDashboardIdUnique(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.existingDashboardIds$.pipe(
      map(ids => {
        const isUnique = !ids.includes(control.value);
        return isUnique ? null : { uniqueId: true };
      })
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.addDashboardForm.valid) {
      this.dialogRef.close(this.addDashboardForm.value);
    }
  }
}
