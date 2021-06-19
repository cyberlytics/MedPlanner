import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FilterAppointmentsService } from 'src/app/services/filter-service/filter-appointments.service';
import { AppHeaderStateService } from 'src/app/services/state-services/app-header-state.service';
import { AppointmentModel } from 'src/app/services/state-services/appointments-dashboard/appointment-model';
import { AppointmentsDashboardStateService } from 'src/app/services/state-services/appointments-dashboard/appointments-dashboard-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment-dashboard-component',
  templateUrl: './appointment-dashboard.component.html',
  styleUrls: ['./appointment-dashboard.component.scss']
})
export class AppointmentDashboardComponent implements OnInit, OnDestroy {

  get isFilterEmpty(): boolean {
    return this.appointmentsFilter.isFilterEmpty;
  }

  get appointments(): ReadonlyArray<AppointmentModel> {
    return this._appointments;
  }
  private _appointments: ReadonlyArray<AppointmentModel>;

  private _filterSubscription: Subscription | undefined;

  constructor(
    headerState: AppHeaderStateService,
    private appointmentsState: AppointmentsDashboardStateService,
    private appointmentsFilter: FilterAppointmentsService,
    private changeDet: ChangeDetectorRef
  ) {
    this._appointments = new Array<AppointmentModel>();

    headerState.setHeaderTitle('Hallo Maximilian!');
    headerState.setHeaderSubTitle('');
  }

  ngOnInit(): void {
    this.loadAppointments();

    this._filterSubscription = this.appointmentsFilter.setOnFilterApplyListener( () => {
      this.loadAppointments();
    });
  }

  ngOnDestroy(): void {
    this._filterSubscription?.unsubscribe();
  }

  private async loadAppointments(): Promise<void> {
    this._appointments = new Array<AppointmentModel>();
    this.changeDet.detectChanges();

    this._appointments = await this.appointmentsState.filteredAppointments;
    this.changeDet.detectChanges();
  }

  public dropFilter(): void {
    this.appointmentsFilter.dropFilter();
  }

}
