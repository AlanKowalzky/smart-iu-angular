import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { DashboardPageActions } from '../../dashboard-page/+state/dashboard.actions';
import { DashboardService } from '../../services/dashboard.service';
import { map, catchError, of, debounceTime, switchMap, take } from 'rxjs';

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
  private dashboardService = inject(DashboardService);

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddDashboardDialogComponent>,
  ) {
    this.form = this.fb.group({
      id: ['', {
        validators: [Validators.required, Validators.maxLength(30)],
        asyncValidators: [this.idExistsValidator()],
        updateOn: 'blur'
      }],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      icon: ['', Validators.required]
    });
  }

  idExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value || control.pristine) {
        return of(null);
      }
      return this.dashboardService.getDashboard(control.value).pipe(
        map(() => ({ unique: true })),
        catchError(error => {
          if (error.status === 404) {
            return of(null);
          }
          return of({ unknownError: true });
        }),
        take(1)
      );
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      const { id, title, icon } = this.form.value;
      this.store.dispatch(DashboardPageActions.createDashboard({ dashboard: { id, title, icon, tabs: [] } }));
      this.dialogRef.close();
    }
  }
}