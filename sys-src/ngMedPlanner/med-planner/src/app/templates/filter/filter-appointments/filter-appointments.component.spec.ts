import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FilterAppointmentsService } from 'src/app/services/filter-service/filter-appointments.service';
import { AppLoginComponent } from '../../app-login/app-login.component';

import { FilterAppointmentsComponent } from './filter-appointments.component';

describe('FilterAppointmentsComponent', () => {
  let component: FilterAppointmentsComponent;
  let fixture: ComponentFixture<FilterAppointmentsComponent>;

  const filterAppointment = jasmine.createSpyObj(
    'filterAppointment',
    ['dropFilter']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes([
        { path: 'login', component: AppLoginComponent },
      ])],
      declarations: [ FilterAppointmentsComponent ],
      providers: [
        { provide: FilterAppointmentsService, useValue: filterAppointment }
      ]
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

  it('should drop filter by click', () => {
    const button = fixture.nativeElement.querySelector('#drop-filter-button');
    button?.click();

    expect(filterAppointment.dropFilter).toHaveBeenCalled();
  });
});
