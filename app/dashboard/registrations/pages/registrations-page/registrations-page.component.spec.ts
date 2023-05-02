import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsPageComponent } from './registrations-page.component';

describe('RegistrationsPageComponent', () => {
  let component: RegistrationsPageComponent;
  let fixture: ComponentFixture<RegistrationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationsPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
