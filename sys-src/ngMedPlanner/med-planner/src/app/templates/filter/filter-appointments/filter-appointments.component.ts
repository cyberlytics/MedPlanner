import { Component, OnInit } from '@angular/core';
import { FilterAppointmentsService } from 'src/app/services/filter-service/filter-appointments.service';
import { AppHeaderStateService, DrawerAction } from 'src/app/services/state-services/app-header-state.service';

@Component({
  selector: 'app-filter-appointments',
  templateUrl: './filter-appointments.component.html',
  styleUrls: ['./filter-appointments.component.scss']
})
export class FilterAppointmentsComponent implements OnInit {

  get isFilterEmpty(): boolean {
    return this.filterAppointment.isFilterEmpty;
  }

  constructor(
    private filterAppointment: FilterAppointmentsService,
    private appHeader: AppHeaderStateService
  ) {}

  ngOnInit(): void {}

  public dropFilter(): void {
    this.filterAppointment.dropFilter();
    this.appHeader.clickOnFilter(DrawerAction.CLOSE);
  }


}
