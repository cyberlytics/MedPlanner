import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppointmentModel, Priority } from 'src/app/services/state-services/appointments-dashboard/appointment-model';
import { AppointmentDialog } from '../appointment-dialog';
import { FormControl, Validators } from '@angular/forms';
import { DoctorModel } from 'src/app/services/state-services/doctors-dashboard/doctor-model';
import { DoctorsDashboardStateService } from 'src/app/services/state-services/doctors-dashboard/doctors-dashboard-state.service';
import { AppointmentsDashboardStateService } from 'src/app/services/state-services/appointments-dashboard/appointments-dashboard-state.service';

@Component({
  selector: 'app-appointment-edit-view',
  templateUrl: './appointment-edit-view.component.html',
  styleUrls: ['./appointment-edit-view.component.scss']
})
export class AppointmentEditViewComponent extends AppointmentDialog implements OnInit, AfterViewInit {

  get priorityFormControl(): FormControl {
    return this._priorityFormControl;
  }
  private _priorityFormControl: FormControl = new FormControl();

  get titleFormControl(): FormControl {
    return this._titleFormControl;
  }
  private _titleFormControl: FormControl = new FormControl(this.appointment.title);

  get dateFormControl(): FormControl {
    return this._dateFormControl;
  }
  private _dateFormControl: FormControl = new FormControl(this.appointment.date);

  get hourFormControl(): FormControl {
    return this._hourFormControl;
  }
  private _hourFormControl: FormControl = new FormControl(
    this.appointment.hourString
  );
  public readonly hourSelections = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12',
    '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
  ];

  get minutesFormControl(): FormControl {
    return this._minutesFormControl;
  }
  private _minutesFormControl: FormControl = new FormControl(
    this.appointment.minuteString
  );
  public readonly minutesSelections = [
    '00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'
  ];

  get notesFormControl(): FormControl {
    return this._notesFormControl;
  }
  private _notesFormControl: FormControl = new FormControl(this.appointment.note);

  get doctorsFormControl(): FormControl {
    return this._doctorsFormControl;
  }
  private _doctorsFormControl: FormControl = new FormControl(null);

  get doctors(): Array<DoctorModel> {
    return this._doctors;
  }
  private _doctors: Array<DoctorModel>;

  public checked = false;

  constructor(
    private dialogRef: MatDialogRef<AppointmentEditViewComponent, EditingResult>,
    @Inject(MAT_DIALOG_DATA) appointment: AppointmentModel,
    private doctorsState: DoctorsDashboardStateService,
    private appointmentState: AppointmentsDashboardStateService
  ) {
    super(appointment);

    this._titleFormControl.setValidators([Validators.required]);
    this._dateFormControl.setValidators([Validators.required]);
    this._hourFormControl.setValidators([Validators.required]);
    this._minutesFormControl.setValidators([Validators.required]);
    this._doctorsFormControl.setValidators([Validators.required]);

    this._doctors = new Array();
  }

  private async initDoctors(): Promise<void> {
    this._doctors = await this.doctorsState.getStateData();
    this._doctorsFormControl.setValue(this.appointment.doctor);
  }

  private initPrioritySelectorValue(): void {
    switch (this.priority) {
      case Priority.HIGH: {
        this._priorityFormControl.setValue('high');
        break;
      }
      case Priority.MEDIUM: {
        this._priorityFormControl.setValue('medium');
        break;
      }
      case Priority.LOW: {
        this._priorityFormControl.setValue('low');
      }
    }
  }

  private getPriorityFromSelector(): Priority {
    switch (this._priorityFormControl.value as 'high' | 'medium' | 'low') {
      case 'high': return Priority.HIGH;
      case 'medium': return Priority.MEDIUM;
      case 'low': return Priority.LOW;
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initDoctors();
    this.initPrioritySelectorValue();
  }

  public saveChanges(): void {
    this.appointment.update({
      priority: this.getPriorityFromSelector(),
      title: this._titleFormControl.value,
      doctor: this._doctorsFormControl.value,
      date: this.getDate(),
      note: this._notesFormControl.value
    },
    this.checked);

    this.closeDialog({
      buttonClicked: ButtonClicked.SAVE,
      sendEmail: this.checked,
      appointmentToSave: this.appointment
    });
  }

  public deleteAppointment(): void {
    this.appointment.delete();
    this.closeDialog({
      buttonClicked: ButtonClicked.REMOVE
    });
  }

  public cancelEditing(): void {
    this.closeDialog({
      buttonClicked: ButtonClicked.CANCEL
    });
  }

  public closeDialog(result: EditingResult): void {
    this.dialogRef.close(result);
  }

  private getDate(): Date {
    const date = new Date(this._dateFormControl.value);
    date.setHours(this._hourFormControl.value);
    date.setMinutes(this._minutesFormControl.value);

    return date;
  }

}

export interface EditingResult {
  buttonClicked: ButtonClicked;
  sendEmail?: boolean;
  appointmentToSave?: AppointmentModel;
}

export enum ButtonClicked {
  SAVE = 'save',
  CANCEL = 'cancel',
  REMOVE = 'remove'
}
