import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppointmentModel } from 'src/app/services/state-services/appointments-dashboard/appointment-model';
import {MatDialog} from '@angular/material/dialog';
import { AppointmentDetailViewComponent } from './dialogs/appointment-detail-view/appointment-detail-view.component';
import {
  AppointmentEditViewComponent,
  ButtonClicked,
  EditingResult
} from './dialogs/appointment-edit-view/appointment-edit-view.component';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-card-component',
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.scss']
})
export class AppointmentCardComponent implements OnInit {

  @Input() set appointment(value: AppointmentModel | null) {
    this._appointment = value;
  }
  get appointment(): AppointmentModel | null {
    return this._appointment;
  }
  private _appointment: AppointmentModel | null = null;

  get title(): string | undefined {
    return this._appointment?.title;
  }

  get doctorName(): string | undefined {
    return this._appointment?.doctorName;
  }

  get time(): string | undefined {
    return this.appointment?.timeString;
  }

  get dateTime(): string | undefined {
    return this.appointment?.dateString;
  }

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public async onDetailsButtonClick(): Promise<void> {
    const dialogRef =
      this.dialog.open<AppointmentDetailViewComponent, any, MatDialogRef<AppointmentEditViewComponent, EditingResult>>
    (
        AppointmentDetailViewComponent,
        {
          maxHeight: '95vh',
          maxWidth: '95vw',
          width: '40em',
          height: 'auto',
          data: this._appointment,
          autoFocus: false,
          panelClass: 'appointment-dialog',
          disableClose: true
        }
    );

    // wait for closing of appointment dialog
    const closeDetailResult = await dialogRef.afterClosed().toPromise();
    if (closeDetailResult === undefined) {
      // closing after exit button clicked
      return;
    }
    // wait for closing of editing dialog
    const closeEditResult = await closeDetailResult.afterClosed().toPromise();
    if (closeEditResult?.buttonClicked === ButtonClicked.REMOVE) {
      return;
    }
    // reopen appointment detail dialog
    this.onDetailsButtonClick();
  }

}

export interface Tag {
  name: string;
  color: string;
}
