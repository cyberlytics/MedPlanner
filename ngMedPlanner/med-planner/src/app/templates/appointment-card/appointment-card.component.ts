import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-appointment-card-component',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss']
})
export class AppointmentCardComponent implements OnInit {

  private static readonly LOCALE_DE = 'de-DE';

  @Input() set id(value: string | undefined) {
    console.log(`set id ${value}`);
    this._id = value;
  }
  private _id: string | undefined;

  @Input() set title(value: string) {
    if (value === undefined) {
      return;
    }
    this._title = value;
  }
  get title(): string {
    return this._title;
  }
  private _title: string;


  @Input() set medicName(value: string) {
    this._medicName = value;
  }
  get medicName(): string {
    return this._medicName;
  }
  private _medicName: string;


  @Input() set tag(value: Tag | undefined) {
    this._tag = value;
  }
  get tag(): Tag | undefined {
    return this._tag;
  }
  private _tag: Tag | undefined;


  @Input() set dateTimeMillis(value: string) {
    if (value === undefined) {
      return;
    }
    console.log(value);
    this._date.setTime( parseFloat(value) );
  }
  private _date: Date;


  get time(): string {
    return this._date.toLocaleTimeString(AppointmentCardComponent.LOCALE_DE, {
      hour: '2-digit',
      minute: '2-digit'
    });
  }


  get date(): string {
    return this._date.toLocaleDateString(AppointmentCardComponent.LOCALE_DE, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  @Output('onDetailsClick') get onDetailsClickEmmiter(): EventEmitter<string> {
    return this._onDetailsClickEmmiter;
  }
  private _onDetailsClickEmmiter: EventEmitter<string>;



  constructor() {
    this._title = '<< none >>';

    this._medicName = '<< none >>';

    this._date = new Date();

    this._onDetailsClickEmmiter = new EventEmitter();
  }


  ngOnInit(): void {}


  public onDetailsButtonClick(): void {
    this._onDetailsClickEmmiter.emit(this._id);
  }

}

export interface Tag {
  name: string;
  color: string;
}
