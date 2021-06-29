import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AppointmentModel, Priority } from 'src/app/services/state-services/appointments-dashboard/appointment-model';
import { DoctorModel } from 'src/app/services/state-services/doctors-dashboard/doctor-model';
import { SpecializationModel } from 'src/app/services/state-services/specialization/specialization-model';
import { CityModel } from 'src/app/services/state-services/surgery/city-model';
import { SurgeryModel } from 'src/app/services/state-services/surgery/surgery-model';

import { AppointmentDetailViewComponent } from './appointment-detail-view.component';

describe('AppointmentDetailViewComponent', () => {
  let component: AppointmentDetailViewComponent;
  let fixture: ComponentFixture<AppointmentDetailViewComponent>;

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
      website: '' // not used in appointment detail card component
    })
  });

  const appointmentMock = new AppointmentModel({
    id: null,
    title: APPOINTMENT_TITLE,
    datetime: APPOINTMENT_DATETIME_STRING,
    doctor: doctorMock,
    priority: Priority.HIGH,
  });

  const dialogRef = {
    open: () => {}
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentDetailViewComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: appointmentMock },
        { provide: MatDialogRef, useValue: dialogRef },
        { provide: MatDialog, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain date string', () => {
    const element = fixture.nativeElement.querySelector('#date-detail');
    expect(element.innerText).toContain(appointmentMock.dateString);
  });

  it('should contain time string', () => {
    const element = fixture.nativeElement.querySelector('#time-detail');
    expect(element.innerText).toContain(appointmentMock.timeString);
  });

  it('should contain address string', () => {
    const element = fixture.nativeElement.querySelector('#address-detail');
    expect(element.innerText).toContain(appointmentMock.address);
  });

  it('should contain zipcode string', () => {
    const element = fixture.nativeElement.querySelector('#zipcode-detail');
    expect(element.innerText).toContain(appointmentMock.zipcode);
  });

  it('should contain city string', () => {
    const element = fixture.nativeElement.querySelector('#city-detail');
    expect(element.innerText).toContain(appointmentMock.city);
  });

  it('should contain doctor name string', () => {
    const element = fixture.nativeElement.querySelector('#doctor-detail');
    expect(element.innerText).toContain(`Dr. ${appointmentMock.doctorName}`);
  });

  it('should contain telephone string', () => {
    const element = fixture.nativeElement.querySelector('#telephone-detail');
    expect(element.innerText).toContain(`Rufnummer: ${appointmentMock.doctorsPhoneNumber}`);
  });

  it('should call function call dialog by click on OK', () => {
    spyOn(component, 'closeDialog');
    const element = fixture.nativeElement.querySelector('#ok-button');
    element.click();

    expect(component.closeDialog).toHaveBeenCalled();
  });

  it('should call function call activate edit mode by click on Edit', () => {
    spyOn(component, 'activateEditMode');
    const element = fixture.nativeElement.querySelector('#edit-button');
    element.click();

    expect(component.activateEditMode).toHaveBeenCalled();
  });
});
