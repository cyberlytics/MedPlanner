import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppointmentModel, Priority } from 'src/app/services/state-services/appointments-dashboard/appointment-model';
import { AppointmentDialog } from '../appointment-dialog';
import { FormControl, Validators } from '@angular/forms';
import { DoctorModel } from 'src/app/services/state-services/doctors-dashboard/doctor-model';
import { DoctorsDashboardStateService } from 'src/app/services/state-services/doctors-dashboard/doctors-dashboard-state.service';

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

  get timeFormControl(): FormControl {
    return this._timeFormControl;
  }
  private _timeFormControl: FormControl = new FormControl(
    this.appointment.timeString
  );

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

  constructor(
    private dialogRef: MatDialogRef<AppointmentEditViewComponent>,
    @Inject(MAT_DIALOG_DATA) appointment: AppointmentModel,
    private doctorsState: DoctorsDashboardStateService
  ) {
    super(appointment);

    this._titleFormControl.setValidators([Validators.required]);
    this._dateFormControl.setValidators([Validators.required]);
    this._timeFormControl.setValidators([Validators.required]);
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

    this.appointment.updateAppointment({
      priority: this.getPriorityFromSelector(),
      title: this._titleFormControl.value,
      doctor: this._doctorsFormControl.value,
      date: this.getDate(),
      note: this._notesFormControl.value
    });

    this.closeDialog();
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

  private getDate(): Date {
    const date = new Date(this._dateFormControl.value);
    date.setHours(this._timeFormControl.value.split(':')[0]);
    date.setMinutes(this._timeFormControl.value.split(':')[1]);

    return date;
  }

}
