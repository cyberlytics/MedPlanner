import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AppointmentModel, Priority } from 'src/app/services/state-services/appointments-dashboard/appointment-model';
import { DoctorModel } from 'src/app/services/state-services/doctors-dashboard/doctor-model';
import { SpecializationModel } from 'src/app/services/state-services/specialization/specialization-model';
import { CityModel } from 'src/app/services/state-services/surgery/city-model';
import { SurgeryModel } from 'src/app/services/state-services/surgery/surgery-model';

import { AppointmentCardComponent } from './appointment-card.component';

describe('appointmentCardComponent', () => {
  let component: AppointmentCardComponent;
  let fixture: ComponentFixture<AppointmentCardComponent>;

  const APPOINTMENT_TITLE = 'Some title';
  const APPOINTMENT_DATETIME_STRING = '2021-06-25 10:00:00';
  const APPOINTMENT_DATE_STRING = new Date(APPOINTMENT_DATETIME_STRING)
    .toLocaleDateString(AppointmentModel.LOCALE_DE, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
  });
  const APPOINTMENT_TIME_STRING = new Date(APPOINTMENT_DATETIME_STRING)
    .toLocaleTimeString(AppointmentModel.LOCALE_DE, {
      hour: '2-digit',
      minute: '2-digit'
  });

  const DOCTOR_FIRST_NAME = 'John';
  const DOCTOR_SURNAME = 'Doe';

  const SPECIALIZATION_DESCRIPTION = 'Some specialization';
  const SPECIALIZATION_COLOR = '#ffffff';

  const CITY = 'Amberg';
  const ZIPCODE = '92224';

  const ADDRESS = 'Some address';
  const TELEPHONE_NUMBER = '123456789';

  const doctorMock = new DoctorModel({
    id: 0,
    first_name: DOCTOR_FIRST_NAME,
    surname: DOCTOR_SURNAME,
    specializations: [
      new SpecializationModel(
        {
          id: 0,
          description: SPECIALIZATION_DESCRIPTION,
          color: SPECIALIZATION_COLOR
        }
      ),
    ],
    surgery: new SurgeryModel({
      id: 0,
      cityModel: new CityModel({
        city: CITY,
        zipcode: ZIPCODE
      }),
      address: ADDRESS,
      telephoneNumber: TELEPHONE_NUMBER,
      website: '' // not used in appointment card component
    })
  });

  const appointmentMock = new AppointmentModel({
    id: null,
    title: APPOINTMENT_TITLE,
    datetime: APPOINTMENT_DATETIME_STRING,
    doctor: doctorMock,
    priority: Priority.HIGH,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentCardComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCardComponent);
    component = fixture.componentInstance;
    component.appointment = appointmentMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud create an appointment title', () => {
    const element = fixture.nativeElement.querySelector('#appointment-title');
    expect(element.innerText).toContain(APPOINTMENT_TITLE);
  });

  it('shoud create a medic name', () => {
    const element = fixture.nativeElement.querySelector('#appointment-medic-name');
    expect(element.innerText).toContain( `Dr. ${DOCTOR_FIRST_NAME} ${DOCTOR_SURNAME}` );
  });

  it('shoud create a date day/month/year', () => {
    const element = fixture.nativeElement.querySelector('#appointment-date');
    expect(element.innerText).toContain(APPOINTMENT_DATE_STRING);
  });

  it('shoud create a date time hour/minute', () => {
    const element = fixture.nativeElement.querySelector('#appointment-time');
    expect(element.innerText).toContain(APPOINTMENT_TIME_STRING);
  });

  it('it should call detail dialog on detail button click', () => {
    spyOn(component, 'onDetailsButtonClick');

    const element = fixture.nativeElement.querySelector('#appointment-button');
    element.click();

    expect(component.onDetailsButtonClick).toHaveBeenCalled();
  });
});
