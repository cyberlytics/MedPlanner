import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppointmentModel, Priority } from 'src/app/services/state-services/appointments-dashboard/appointment-model';
import { FormControl } from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-appointment-detail-view-component',
  templateUrl: './appointment-detail-view.component.html',
  styleUrls: ['./appointment-detail-view.component.scss']
})
export class AppointmentDetailViewComponent implements OnInit {

  get priority(): Priority {
    return this.appointment.priority;
  }

  get city(): string | undefined {
    return this.appointment.city;
  }

  get address(): string | undefined {
    return this.appointment.address;
  }

  get doctorsPhoneNumber(): string | undefined {
    return this.appointment.doctorsPhoneNumber;
  }

  get title(): string {
    return this.appointment.title;
  }

  get date(): string {
    return this.appointment.dateString;
  }
  get dateFormControl(): FormControl {
    return this._dateFormControl;
  }
  private _dateFormControl: FormControl = new FormControl(this.appointment.date);

  get time(): string {
    return this.appointment.timeString;
  }

  get doctorName(): string | undefined {
    return this.appointment.doctorName;
  }

  get note(): string | undefined {
    return this.appointment.note;
  }

  get editMode(): boolean {
    return this._editMode;
  }
  private _editMode = false;

  constructor(
    private dialogRef: MatDialogRef<AppointmentDetailViewComponent>,
    @Inject(MAT_DIALOG_DATA) private appointment: AppointmentModel
  ) { }

  ngOnInit(): void {}

  public closeDialog(): void {
    this.dialogRef.close();
  }

  public saveChanges(): void {
    this.appointment.updateAppointment({
      datetime: this._dateFormControl.value
    });

    this.closeDialog();
  }

  public activateEditMode(): void {
    this._editMode = true;
  }

  public onDateChange(event: MatDatepickerInputEvent<Date>): void {
    this._dateFormControl.setValue(event.value);
  }


}
