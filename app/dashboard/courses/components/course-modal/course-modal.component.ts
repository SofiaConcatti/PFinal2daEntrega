import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from '../../../../core/models/course.model';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss'],
})
export class CourseModalComponent {
  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);
  courseCodeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(5),
  ]);
  isActiveToogle = true;

  courseForm = new FormGroup({
    name: this.nameControl,
    courseCode: this.courseCodeControl,
  });

  constructor(
    private readonly dialogRef: DialogRef,
    @Inject(MAT_DIALOG_DATA) public data: Course | null
  ) {
    if (data) {
      this.nameControl.setValue(data.name);
      this.courseCodeControl.setValue(data.courseCode);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
