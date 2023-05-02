import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Registration } from 'src/app/core/models/registration.model';
import { RegistrationsService } from '../../services/registrations.service';
import { RegistrationModalComponent } from '../../components/registration-modal/registration-modal.component';
import { RegistrationModalDescriptionComponent } from '../../components/registration-modal-description/registration-modal-description.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registrations-page',
  templateUrl: './registrations-page.component.html',
  styleUrls: ['./registrations-page.component.scss'],
})
export class RegistrationsPageComponent implements OnInit {
  displayedColumns = [
    'firstName',
    'lastName',
    'courseCode',
    'courseName',
    'edit',
    'delete',
    'description',
  ];
  public hover: number = 0;
  registrations: Observable<Registration[]>;

  constructor(
    private readonly dialogService: MatDialog,
    private registrationsService: RegistrationsService
  ) {
    this.registrations = this.registrationsService.getRegistrationsFromAPI();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll() {
    this.registrations = this.registrationsService.getRegistrationsFromAPI();
  }

  addRegistrationToAPI() {
    const dialog = this.dialogService.open(RegistrationModalComponent);
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.registrationsService.addRegistrationToAPI({
          firstName: data.firstName,
          lastName: data.lastName,
          courseCode: data.courseCode,
          courseName: data.courseName,
        });
      }
      // Subscribe to refresh table after adding data
      this.registrationsService.getRegistrationsFromAPI().subscribe((resp) => {
        this.loadAll();
      });
    });
  }

  editRegistrationFromAPI(element: Registration) {
    const dialog = this.dialogService.open(RegistrationModalComponent, {
      data: element,
    });
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.registrationsService.editRegistrationFromAPI(element.id, data);
      }
      // Subscribe to refresh table after editing data
      this.registrationsService.getRegistrationsFromAPI().subscribe((resp) => {
        this.loadAll();
      });
    });
  }

  deleteRegistrationFromAPI(id: number) {
    this.registrationsService
      .deleteRegistrationFromAPI(id)
      .subscribe((resp) => {
        this.loadAll();
      });
  }

  openDescription(element: Registration) {
    const dialog = this.dialogService.open(
      RegistrationModalDescriptionComponent,
      {
        data: element,
      }
    );
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        this.registrationsService.editRegistrationFromAPI(element.id, data);
      }
      // Subscribe to refresh table after editing data
      this.registrationsService.getRegistrationsFromAPI().subscribe((resp) => {
        this.loadAll();
      });
    });
  }

  showDescriptionRegistration(registration: Registration) {
    this.dialogService.open(RegistrationModalDescriptionComponent, {
      data: registration,
    });
  }
}
