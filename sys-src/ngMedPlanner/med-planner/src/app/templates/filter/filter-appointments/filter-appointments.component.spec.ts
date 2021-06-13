import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAppointmentsComponent } from './filter-appointments.component';

describe('FilterAppointmentsComponent', () => {
  let component: FilterAppointmentsComponent;
  let fixture: ComponentFixture<FilterAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
