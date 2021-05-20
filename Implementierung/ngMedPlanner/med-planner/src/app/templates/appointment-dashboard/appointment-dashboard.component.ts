import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppHeaderStateService } from 'src/app/services/state-services/app-header-state.service';
import { AppointmentModel } from 'src/app/services/state-services/appointments-dashboard/appointment-model';
import { AppointmentsDashboardStateService } from 'src/app/services/state-services/appointments-dashboard/appointments-dashboard-state.service';

@Component({
  selector: 'app-appointment-dashboard-component',
  templateUrl: './appointment-dashboard.component.html',
  styleUrls: ['./appointment-dashboard.component.scss']
})
export class AppointmentDashboardComponent implements OnInit {

  get appointments(): Array<AppointmentModel> {
    return this._appointments;
  }
  private _appointments: Array<AppointmentModel>;

  constructor(
    headerState: AppHeaderStateService,
    private appointmentsState: AppointmentsDashboardStateService,
    private changeDet: ChangeDetectorRef
  ) {
    this._appointments = new Array<AppointmentModel>();

    headerState.setHeaderTitle('Hallo Maximilian!');
    headerState.setHeaderSubTitle('');
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  private async loadAppointments(): Promise<void> {
    this._appointments = await this.appointmentsState.getAppointments();

    console.log(this._appointments);

    this.changeDet.detectChanges();
  }

  public onDetailsClick(appointmentId: string): void {
    console.log(`clicked on appointment with id: ${appointmentId}`);
  }

}
