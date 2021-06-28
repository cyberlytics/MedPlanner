import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { AppointmentCardComponent } from './appointment-card.component';

describe('appointmentCardComponent', () => {
  let component: AppointmentCardComponent;
  let fixture: ComponentFixture<AppointmentCardComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('shoud create an appointment title', () => {
    const titleToTest = 'Some appointment title';

    component.title = titleToTest;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('#appointment-title');
    expect(element.innerText).toContain(titleToTest);
  });

  it('shoud create an empty medic name', () => {
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('#appointment-medic-name');
    expect(element.innerText).toContain('<< none >>');
  });

  it('shoud create a medic name', () => {
    const nameToTest = 'Mr. Dr. John Doe';

    component.medicName = nameToTest;
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('#appointment-medic-name');
    expect(element.innerText).toContain(nameToTest);
  });

  it('shoud create a date day/month/year', () => {
    const dateToTest = new Date();

    component.dateTimeMillis = dateToTest.getTime().toString();
    fixture.detectChanges();

    const dateString = dateToTest.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const element = fixture.nativeElement.querySelector('#appointment-date');
    expect(element.innerText).toContain(dateString);
  });

  it('shoud create a date time hour/minute', () => {
    const dateToTest = new Date();

    component.dateTimeMillis = dateToTest.getTime().toString();
    fixture.detectChanges();

    const dateString = dateToTest.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const element = fixture.nativeElement.querySelector('#appointment-time');
    expect(element.innerText).toContain(dateString);
  }); */
});
