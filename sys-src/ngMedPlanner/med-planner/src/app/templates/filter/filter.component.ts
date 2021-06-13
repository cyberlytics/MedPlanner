import { Component, OnInit } from '@angular/core';
import { FilterMode, FilterModeService } from 'src/app/services/filter-service/filter-mode.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  get isAppointmentsFilterActive(): boolean {
    return this.filterModeService.currentFilterMode === FilterMode.APPOINTMENTS;
  }

  get isDoctorsFilterActive(): boolean {
    return this.filterModeService.currentFilterMode === FilterMode.DOCTORS;
  }

  constructor(private filterModeService: FilterModeService) {}

  ngOnInit(): void {}

}
