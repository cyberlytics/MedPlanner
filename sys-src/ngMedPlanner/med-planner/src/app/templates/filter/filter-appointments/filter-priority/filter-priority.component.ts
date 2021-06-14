import { Component, OnInit } from '@angular/core';
import { FilterAppointmentsService } from 'src/app/services/filter-service/filter-appointments.service';

@Component({
  selector: 'app-filter-priority',
  templateUrl: './filter-priority.component.html',
  styleUrls: ['./filter-priority.component.scss']
})
export class FilterPriorityComponent implements OnInit {

  set highPriority(value: boolean) {
    this.filterAppointment.isHighPrioritySelected = value;
  }
  get highPriority(): boolean {
    return this.filterAppointment.isHighPrioritySelected;
  }

  set mediumPriority(value: boolean) {
    this.filterAppointment.isMediumPrioritySelected = value;
  }
  get mediumPriority(): boolean {
    return this.filterAppointment.isMediumPrioritySelected;
  }

  set lowPriority(value: boolean) {
    this.filterAppointment.isLowPrioritySelected = value;
  }
  get lowPriority(): boolean {
    return this.filterAppointment.isLowPrioritySelected;
  }

  constructor(
    private filterAppointment: FilterAppointmentsService
  ) { }

  ngOnInit(): void {}

  public clickHigh(): void {
    this.highPriority = !this.highPriority;
  }

  public clickMedium(): void {
    this.mediumPriority = !this.mediumPriority;
  }

  public clickLow(): void {
    this.lowPriority = !this.lowPriority;
  }

}
