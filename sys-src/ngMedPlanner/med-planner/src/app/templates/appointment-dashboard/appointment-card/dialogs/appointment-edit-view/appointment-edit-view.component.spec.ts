import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentEditViewComponent } from './appointment-edit-view.component';

describe('AppointmentEditViewComponent', () => {
  let component: AppointmentEditViewComponent;
  let fixture: ComponentFixture<AppointmentEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentEditViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
