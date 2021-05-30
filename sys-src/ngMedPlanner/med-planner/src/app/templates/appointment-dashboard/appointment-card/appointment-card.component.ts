import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppointmentModel } from 'src/app/services/state-services/appointments-dashboard/appointment-model';

@Component({
  selector: 'app-appointment-card-component',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss']
})
export class AppointmentCardComponent implements OnInit {

  private static readonly LOCALE_DE = 'de-DE';

  @Input() set appointment(value: AppointmentModel | null) {
    this._appointment = value;

    if (value !== null) {
      this._date = new Date(value.datetime);
    }
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


  private _date: Date;

  get time(): string {
    return this._date.toLocaleTimeString(AppointmentCardComponent.LOCALE_DE, {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  get dateTime(): string {
    return this._date.toLocaleDateString(AppointmentCardComponent.LOCALE_DE, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  @Output('onDetailsClick') get onDetailsClickEmmiter(): EventEmitter<number | null> {
    return this._onDetailsClickEmmiter;
  }
  private _onDetailsClickEmmiter: EventEmitter<number | null>;


  constructor() {
    this._date = new Date();

    this._onDetailsClickEmmiter = new EventEmitter<number | null>();
  }

  ngOnInit(): void {}

  public onDetailsButtonClick(): void {
    this._onDetailsClickEmmiter.emit(this._appointment?.id);
  }

}

export interface Tag {
  name: string;
  color: string;
}
