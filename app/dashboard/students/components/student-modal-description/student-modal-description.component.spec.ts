import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentModalDescriptionComponent } from './student-modal-description.component';

describe('StudentModalDescriptionComponent', () => {
  let component: StudentModalDescriptionComponent;
  let fixture: ComponentFixture<StudentModalDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentModalDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentModalDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
