import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AppointmentDashboardComponent } from './appointment-dashboard.component';
import { AppointmentsDashboardStateService } from 'src/app/services/state-services/appointments-dashboard/appointments-dashboard-state.service';
import { ButtonClicked, EditingResult } from './appointment-card/dialogs/appointment-edit-view/appointment-edit-view.component';
import { AppointmentModel } from 'src/app/services/state-services/appointments-dashboard/appointment-model';

describe('appointmentDashboardComponent', () => {
  let component: AppointmentDashboardComponent;
  let fixture: ComponentFixture<AppointmentDashboardComponent>;

  const appointmentState = {
    addNewAppointment: () => {},
    filteredAppointments: []
  };

  const observable = {
    toPromise: () => {
      return {} as EditingResult;
    }
  };

  const matDialogRef = {
    afterClosed: () => {
      return observable;
    }
  };

  const dialog = {
    open: () => {
      return matDialogRef;
    }
  };

  const APPOINTMENTS_LENGTH = 10;
  const appointments: null[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppointmentDashboardComponent
      ],
      providers: [
        HttpHandler, HttpClient,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: dialog },
        { provide: AppointmentsDashboardStateService, useValue: appointmentState }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDashboardComponent);
    component = fixture.componentInstance;

    for (let i = 0; i < APPOINTMENTS_LENGTH; i++) {
      appointments.push(null);
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: find out how to test *ngFor
  /* it('should contain appointment components', () => {
    spyOnProperty(component, 'appointments').and.returnValue(appointments);

    const elements = fixture.debugElement.queryAll(By.css('.appointment-component'));
    expect(elements.length).toEqual(APPOINTMENTS_LENGTH);
  }); */

  it('should call function add new appointment by click', () => {
    spyOn(component, 'addNewAppointment');

    const element = fixture.nativeElement.querySelector('#add-new-button');
    element.click();

    expect(component.addNewAppointment).toHaveBeenCalled();
  });

  it('should open dialog to add new appointment by click', () => {
    spyOn(dialog, 'open');

    const element = fixture.nativeElement.querySelector('#add-new-button');
    element.click();

    expect(dialog.open).toHaveBeenCalled();
  });

  // TODO: do not register spy call
  /* it('should add new appointment', () => {
    spyOn(dialog, 'open').and.returnValue(matDialogRef);
    spyOn(matDialogRef, 'afterClosed').and.returnValue(observable);
    spyOn(observable, 'toPromise').and.returnValue({
      buttonClicked: ButtonClicked.SAVE,
      appointmentToSave: {} as AppointmentModel
    });

    spyOn(appointmentState, 'addNewAppointment');

    const element = fixture.nativeElement.querySelector('#add-new-button');
    element.click();

    expect(appointmentState.addNewAppointment).toHaveBeenCalled();
  }); */

  it('should NOT add new appointment', () => {
    spyOn(dialog, 'open').and.returnValue(matDialogRef);
    spyOn(matDialogRef, 'afterClosed').and.returnValue(observable);
    spyOn(observable, 'toPromise').and.returnValue({
      buttonClicked: ButtonClicked.CANCEL
    });

    spyOn(appointmentState, 'addNewAppointment');

    const element = fixture.nativeElement.querySelector('#add-new-button');
    element.click();

    expect(appointmentState.addNewAppointment).not.toHaveBeenCalled();
  });
});
