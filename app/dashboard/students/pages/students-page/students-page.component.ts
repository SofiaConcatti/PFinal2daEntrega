import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentModalComponent } from '../../components/student-modal/student-modal.component';
import { StudentModalDescriptionComponent } from '../../components/student-modal-description/student-modal-description.component';
/* import { StudentDialogDescriptionComponent } from 'src/app/shared/components/student-dialog-description/student-dialog-description.component';
import { StudentDialogComponent } from '../../shared/components/student-dialog/student-dialog.component'; */
import { StudentsService } from '../../services/students.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss'],
})
export class StudentsPageComponent implements OnInit {
  displayedColumns = [
    'firstName',
    'lastName',
    'email',
    'isActive',
    'edit',
    'delete',
    'description',
  ];
  public hover: number = 0;
  students: Observable<Student[]>;

  constructor(
    private readonly dialogService: MatDialog,
    private studentsService: StudentsService
  ) {
    this.students = this.studentsService.getStudentsFromAPI();
  }
  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll() {
    this.students = this.studentsService.getStudentsFromAPI();
  }

  addStudentToAPI() {
    const dialog = this.dialogService.open(StudentModalComponent);
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.studentsService.addStudentToAPI({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      }
      // Subscribe to refresh table after adding data
      this.studentsService.getStudentsFromAPI().subscribe((resp) => {
        this.loadAll();
      });
    });
  }

  editStudentFromAPI(element: Student) {
    const dialog = this.dialogService.open(StudentModalComponent, {
      data: element,
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.studentsService.editStudentFromAPI(element.id, data);
      }
      // Subscribe to refresh table after editing data
      this.studentsService.getStudentsFromAPI().subscribe((resp) => {
        this.loadAll();
      });
    });
  }

  deleteStudentFromAPI(id: number) {
    this.studentsService.deleteStudentFromAPI(id).subscribe((resp) => {
      this.loadAll();
    });
  }

  changeActive(student: Student) {
    this.studentsService.changeActive(student);
  }

  showDescriptionStudent(student: Student) {
    this.dialogService.open(StudentModalDescriptionComponent, {
      data: student,
    });
  }
}
