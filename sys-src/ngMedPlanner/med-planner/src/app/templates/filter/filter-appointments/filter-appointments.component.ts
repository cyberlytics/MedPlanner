import { Component, OnInit } from '@angular/core';
import { FilterAppointmentsService } from 'src/app/services/filter-service/filter-appointments.service';
import { AppHeaderStateService, DrawerAction } from 'src/app/services/state-services/app-header-state.service';
import { SpecializationModel } from 'src/app/services/state-services/specialization/specialization-model';
import { SpecializationStateService } from 'src/app/services/state-services/specialization/specialization-state.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-filter-appointments',
  templateUrl: './filter-appointments.component.html',
  styleUrls: ['./filter-appointments.component.scss']
})
export class FilterAppointmentsComponent implements OnInit {

  get isFilterEmpty(): boolean {
    return this.filterAppointment.isFilterEmpty;
  }

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

  get specializationsList(): Array<SpecializationModel> {
    return this._specializationsList;
  }
  private _specializationsList: Array<SpecializationModel>;

  specializationControl: FormControl;

  constructor(
    private filterAppointment: FilterAppointmentsService,
    private specializationsState: SpecializationStateService,
    private appHeader: AppHeaderStateService
  ) {
    this._specializationsList = new Array();
    this.specializationControl = new FormControl();
  }

  ngOnInit(): void {
    this.loadSpecilizationsList();
  }

  private async loadSpecilizationsList(): Promise<void> {
    this._specializationsList = await this.specializationsState.getStateData();
  }

  public dropFilter(): void {
    this.filterAppointment.dropFilter();
  }

  public onApplyClick(): void {
    this.filterAppointment.applyFilter();
    this.appHeader.clickOnFilter(DrawerAction.CLOSE);
  }

  public onCancelClick(): void {
    this.appHeader.clickOnFilter(DrawerAction.CLOSE);
  }

}
