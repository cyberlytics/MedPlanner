import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
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

    headerState.setHeaderTitle('Hallo Maximilian!');
    headerState.setHeaderSubTitle('');
   }

  ngOnInit(): void {
    this.loadDoctors();
  }



  private async loadDoctors(): Promise<void> {
    this.changeDet.detectChanges();

    const doctors = await this.doctorssState.getStateData();
    this._doctors = this.doctorssState.sortDoctorsAlphabetically(doctors);
  }
  
}
