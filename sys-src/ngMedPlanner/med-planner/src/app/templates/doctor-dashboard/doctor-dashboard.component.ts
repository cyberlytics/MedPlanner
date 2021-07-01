import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AppHeaderStateService } from 'src/app/services/state-services/app-header-state.service';
import { DoctorModel } from 'src/app/services/state-services/doctors-dashboard/doctor-model';
import { DoctorsDashboardStateService } from 'src/app/services/state-services/doctors-dashboard/doctors-dashboard-state.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {

  get doctors(): Array<DoctorModel> {
    return this._doctors;
  }
  private _doctors: Array<DoctorModel>;

  constructor(
    headerState: AppHeaderStateService,
    private doctorssState: DoctorsDashboardStateService,
    private changeDet: ChangeDetectorRef
  ) {
    this._doctors = new Array<DoctorModel>();

    headerState.setHeaderTitle('Willkommen!');
    headerState.setHeaderSubTitle('Ihre Ärzte auf einen Blick:');
   }

  ngOnInit(): void {
    this.loadDoctors();
  }


  /**
   * Function loads doctors of User and stores them in "doctors".
   * Also sorts them alphabetically
   */
  private async loadDoctors(): Promise<void> {
    this.changeDet.detectChanges();

    const doctors = await this.doctorssState.getStateData();
    this._doctors = this.doctorssState.sortDoctorsAlphabetically(doctors);
  }

}
