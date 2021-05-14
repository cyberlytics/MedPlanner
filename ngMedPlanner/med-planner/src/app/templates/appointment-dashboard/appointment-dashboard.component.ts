import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppointmentMock } from 'src/app/services/data-interfaces/data-interfaces';
import { AppointmentsDataService } from 'src/app/services/data/appointments-data.service';

@Component({
  selector: 'app-appointment-dashboard-component',
  templateUrl: './appointment-dashboard.component.html',
  styleUrls: ['./appointment-dashboard.component.scss']
})
export class AppointmentDashboardComponent implements OnInit {

  get appointmentsList(): Array<AppointmentMock> {
    return this._appointmentsList;
  }
  private _appointmentsList: Array<AppointmentMock>;

  constructor(
    private appointmentsData: AppointmentsDataService,
    private changeDet: ChangeDetectorRef
  ) {
    this._appointmentsList = new Array<AppointmentMock>();
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  private async loadAppointments(): Promise<void> {
    const data = await this.appointmentsData.getData();

    this._appointmentsList = data.appointments;

    console.log(this._appointmentsList);

    this.changeDet.detectChanges();
  }

  public onDetailsClick(appointmentId: string): void {
    console.log(`clicked on appointment with id: ${appointmentId}`);
  }

}
