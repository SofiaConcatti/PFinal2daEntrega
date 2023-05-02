import { Injectable } from '@angular/core';
import { Registration } from 'src/app/core/models/registration.model';
import { BehaviorSubject, Observable, take, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.registrations';

@Injectable({
  providedIn: 'root',
})
export class RegistrationsService {
  private registrations = new BehaviorSubject<Registration[]>([]);

  public registrations$: Observable<Registration[]>;
  constructor(private httpClient: HttpClient) {
    this.registrations$ = this.registrations.asObservable();
  }

  getRegistrationsFromAPI(): Observable<Registration[]> {
    return this.httpClient.get<Registration[]>(
      `${environment.URLbase}registrations`
    );
  }

  deleteRegistrationFromAPI(id: number) {
    return this.httpClient.delete(`${environment.URLbase}registrations/${id}`);
  }

  addRegistrationToAPI(
    newRegistrationData: Omit<Registration, 'id' | 'isActive'>
  ): void {
    const registrationsFromAPI = this.getRegistrationsFromAPI();
    registrationsFromAPI.pipe(take(1)).subscribe((registrations) => {
      const lastId = registrations[registrations.length - 1]?.id || 0;
      this.httpClient
        .post<Registration[]>(
          `${environment.URLbase}registrations`,
          new Registration(
            lastId + 1,
            newRegistrationData.firstName,
            newRegistrationData.lastName,
            newRegistrationData.courseCode,
            newRegistrationData.courseName
          )
        )
        .subscribe((resp) => {
          console.log(resp);
        });
    });
  }

  editRegistrationFromAPI(id: number, data: Partial<Registration>): void {
    const registrationsFromAPI = this.getRegistrationsFromAPI();
    registrationsFromAPI.pipe(take(1)).subscribe((registrations) => {
      this.registrations.next(
        registrations.map((r) => (r.id === id ? { ...r, ...data } : r))
      );
    });
    this.httpClient
      .put<Registration[]>(`${environment.URLbase}registrations/${id}`, data)
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  changeActive(registration: Registration): void {
    this.registrations.pipe(take(1)).subscribe((registrations) => {
      this.registrations.next(
        registrations.map((r) => {
          if (r.id === registration.id) {
            return new Registration(
              r.id,
              r.firstName,
              r.lastName,
              r.courseCode,
              r.courseName
            );
          }
          return r;
        })
      );
    });
  }
}
