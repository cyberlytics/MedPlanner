import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { FilterAppointmentsService } from 'src/app/services/filter-service/filter-appointments.service';
import { AppHeaderStateService } from 'src/app/services/state-services/app-header-state.service';
import { AppointmentModel, Priority } from 'src/app/services/state-services/appointments-dashboard/appointment-model';
import { AppointmentsDashboardStateService } from 'src/app/services/state-services/appointments-dashboard/appointments-dashboard-state.service';
import { Subscription } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { AppointmentEditViewComponent, ButtonClicked, EditingResult } from './appointment-card/dialogs/appointment-edit-view/appointment-edit-view.component';

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
    private changeDet: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this._appointments = new Array<AppointmentModel>();

    headerState.setHeaderTitle('Willkommen!');
    headerState.setHeaderSubTitle('Deine anstehenden Termine:');
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

  public async addNewAppointment(): Promise<void> {

    const dialogRef = this.dialog.open<AppointmentEditViewComponent, AppointmentModel, EditingResult>(
      AppointmentEditViewComponent,
      {
        maxHeight: '95vh',
        maxWidth: '95vw',
        width: '40em',
        data: new AppointmentModel(
          {
            id: null,
            title: '',
            datetime: Date.now().toLocaleString(),
            doctor: null,
            priority: Priority.MEDIUM
          }
        ),
        autoFocus: false,
        panelClass: 'appointment-dialog',
        disableClose: true
      }
    );

    const editingResult = await dialogRef.afterClosed().toPromise();

    if (editingResult === undefined) {
      return;
    }

    if (editingResult.buttonClicked === ButtonClicked.CANCEL) {
      return;
    }

    if (!editingResult.appointmentToSave) {
      return;
    }

    const createdResult =
      await this.appointmentsState.addNewAppointment(
        editingResult.appointmentToSave,
        editingResult.sendEmail
      );
  }

}
