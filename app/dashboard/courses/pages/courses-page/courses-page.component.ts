import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from '../../../../core/models/course.model';
import { CoursesService } from '../../services/courses.service';
import { CourseModalComponent } from '../../components/course-modal/course-modal.component';
import { CourseModalDescriptionComponent } from '../../components/course-modal-description/course-modal-description.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss'],
})
export class CoursesPageComponent implements OnInit {
  displayedColumns = [
    'courseCode',
    'name',
    'isActive',
    'edit',
    'delete',
    'description',
  ];
  public hover: number = 0;
  courses: Observable<Course[]>;

  constructor(
    private readonly dialogService: MatDialog,
    private coursesService: CoursesService
  ) {
    this.courses = this.coursesService.getCoursesFromAPI();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll() {
    this.courses = this.coursesService.getCoursesFromAPI();
  }

  addCourseToAPI() {
    const dialog = this.dialogService.open(CourseModalComponent);
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.coursesService.addCourseToAPI({
          courseCode: data.courseCode,
          name: data.name,
        });
      }
      // Subscribe to refresh table after adding data
      this.coursesService.getCoursesFromAPI().subscribe((resp) => {
        this.loadAll();
      });
    });
  }

  editCourseFromAPI(element: Course) {
    const dialog = this.dialogService.open(CourseModalComponent, {
      data: element,
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.coursesService.editCourseFromAPI(element.id, data);
      }
      // Subscribe to refresh table after editing data
      this.coursesService.getCoursesFromAPI().subscribe((resp) => {
        this.loadAll();
      });
    });
  }

  deleteCourseFromAPI(id: number) {
    this.coursesService.deleteCourseFromAPI(id).subscribe((resp) => {
      this.loadAll();
    });
  }

  openDescription(element: Course) {
    const dialog = this.dialogService.open(CourseModalDescriptionComponent, {
      data: element,
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.coursesService.editCourseFromAPI(element.id, data);
      }
      // Subscribe to refresh table after editing data
      this.coursesService.getCoursesFromAPI().subscribe((resp) => {
        this.loadAll();
      });
    });
  }

  changeActive(course: Course) {
    this.coursesService.changeActive(course);
  }

  showDescriptionCourse(course: Course) {
    this.dialogService.open(CourseModalDescriptionComponent, {
      data: course,
    });
  }
}
