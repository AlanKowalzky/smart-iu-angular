import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Dashboard } from '../../models';

@Component({
  selector: 'app-add-tab-dialog',
  templateUrl: './add-tab-dialog.component.html',
  styleUrls: ['./add-tab-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AddTabDialogComponent implements OnInit {
  form: FormGroup;
  private currentDashboard: Dashboard;

  private fb = inject(FormBuilder);
  dialogRef = inject(MatDialogRef<AddTabDialogComponent>);
  data = inject<{ dashboard: Dashboard }>(MAT_DIALOG_DATA);

  constructor() {
    this.currentDashboard = this.data.dashboard;
    this.form = this.fb.group({
      title: ['', {
        validators: [Validators.required, Validators.maxLength(50)],
        asyncValidators: [this.tabTitleUniqueValidator()],
        updateOn: 'blur'
      }]
    });
  }

  ngOnInit(): void {
    // No specific initialization needed here for now
  }

  tabTitleUniqueValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<{ [key: string]: any } | null> | Observable<{ [key: string]: any } | null> => {
      if (!control.value || control.pristine) {
        return of(null);
      }
      const isUnique = !this.currentDashboard.tabs.some(tab => tab.title.toLowerCase() === control.value.toLowerCase());
      return of(isUnique ? null : { titleExists: true }).pipe(take(1));
    };
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.title);
    }
  }
}

