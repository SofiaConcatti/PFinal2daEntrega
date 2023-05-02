import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseModalDescriptionComponent } from './course-modal-description.component';

describe('CourseModalDescriptionComponent', () => {
  let component: CourseModalDescriptionComponent;
  let fixture: ComponentFixture<CourseModalDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseModalDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseModalDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
