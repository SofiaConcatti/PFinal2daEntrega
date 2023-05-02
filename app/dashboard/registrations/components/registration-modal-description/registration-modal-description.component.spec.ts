import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationModalDescriptionComponent } from './registration-modal-description.component';

describe('RegistrationModalDescriptionComponent', () => {
  let component: RegistrationModalDescriptionComponent;
  let fixture: ComponentFixture<RegistrationModalDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationModalDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationModalDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
