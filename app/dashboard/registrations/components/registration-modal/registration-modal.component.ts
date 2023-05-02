import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Registration } from 'src/app/models/registration.model';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss'],
})
export class RegistrationModalComponent {
  firstNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  lastNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  courseCodeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(5),
  ]);
  courseNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  registrationForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    courseCode: this.courseCodeControl,
    courseName: this.courseNameControl,
  });

  constructor(
    private readonly dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: Registration | null
  ) {
    if (data) {
      this.firstNameControl.setValue(data.firstName);
      this.lastNameControl.setValue(data.lastName);
      this.courseCodeControl.setValue(data.courseCode);
      this.courseNameControl.setValue(data.courseName);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
