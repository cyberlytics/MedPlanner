import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppointmentModel } from 'src/app/services/state-services/appointments-dashboard/appointment-model';
import {MatDialog} from '@angular/material/dialog';
import { AppointmentDetailViewComponent } from './appointment-detail-view/appointment-detail-view.component';

@Component({
  selector: 'app-appointment-card-component',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss']
})
export class AppointmentCardComponent implements OnInit {

  @Input() set appointment(value: AppointmentModel | null) {
    this._appointment = value;
  }
  get appointment(): AppointmentModel | null {
    return this._appointment;
  }
  private _appointment: AppointmentModel | null = null;

  get title(): string | undefined {
    return this._appointment?.title;
  }

  get doctorName(): string | undefined {
    return this._appointment?.doctorName;
  }


  @Input() set tag(value: Tag | undefined) {
    this._tag = value;
  }
  get tag(): Tag | undefined {
    return this._tag;
  }
  private _tag: Tag | undefined;

  get time(): string | undefined {
    return this.appointment?.timeString;
  }

  get dateTime(): string | undefined {
    return this.appointment?.dateString;
  }

  @Output('onDetailsClick') get onDetailsClickEmmiter(): EventEmitter<number | null> {
    return this._onDetailsClickEmmiter;
  }
  private _onDetailsClickEmmiter: EventEmitter<number | null>;


  constructor(
    private dialog: MatDialog
  ) {
    this._onDetailsClickEmmiter = new EventEmitter<number | null>();
  }

  ngOnInit(): void {}

  public onDetailsButtonClick(): void {
    this._onDetailsClickEmmiter.emit(this._appointment?.id);

    const dialogHeight = window.innerWidth < 576 ? '100vh' : 'auto';

    const dialogRef = this.dialog.open(AppointmentDetailViewComponent, {
      maxHeight: '95vh',
      maxWidth: '95vw',
      width: '40em',
      height: 'auto',
      data: this._appointment,
      autoFocus: false,
      panelClass: 'appointment-dialog',
      disableClose: true
    });

  }

}

export interface Tag {
  name: string;
  color: string;
}
