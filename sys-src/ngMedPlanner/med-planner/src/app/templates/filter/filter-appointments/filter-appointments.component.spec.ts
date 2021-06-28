import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppLoginComponent } from '../../app-login/app-login.component';

import { FilterAppointmentsComponent } from './filter-appointments.component';

describe('FilterAppointmentsComponent', () => {
  let component: FilterAppointmentsComponent;
  let fixture: ComponentFixture<FilterAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([
        { path: 'login', component: AppLoginComponent },
      ])],
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
