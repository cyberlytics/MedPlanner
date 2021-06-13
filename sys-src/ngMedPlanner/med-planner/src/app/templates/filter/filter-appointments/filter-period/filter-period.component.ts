import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { FilterAppointmentsService } from 'src/app/services/filter-service/filter-appointments.service';

@Component({
  selector: 'app-filter-period',
  templateUrl: './filter-period.component.html',
  styleUrls: ['./filter-period.component.scss']
})
export class FilterPeriodComponent implements OnInit {

  get range(): FormGroup {
    return this._range;
  }
  private _range: FormGroup = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private filterAppointment: FilterAppointmentsService
  ) {}

  ngOnInit(): void {}

  public addStartDate(event: MatDatepickerInputEvent<Date>): void {
    if (event.value === null) {
      return;
    }
    this.filterAppointment.selectStartDate(event.value);
  }

  public addEndDate(event: MatDatepickerInputEvent<Date>): void {
    if (event.value === null) {
      return;
    }
    this.filterAppointment.selectEndDate(event.value);
  }

  public unpickDate(): void {
    this.filterAppointment.unselectStartDate();
    this.filterAppointment.unselectEndDate();

    this._range.controls.start.setValue(null);
    this._range.controls.end.setValue(null);
  }

}
