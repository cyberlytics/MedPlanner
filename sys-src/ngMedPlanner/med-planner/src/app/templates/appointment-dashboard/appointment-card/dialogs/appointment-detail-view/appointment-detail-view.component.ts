import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppointmentModel, Priority } from 'src/app/services/state-services/appointments-dashboard/appointment-model';
import {MatDialog} from '@angular/material/dialog';
import { AppointmentEditViewComponent } from '../appointment-edit-view/appointment-edit-view.component';
import { AppointmentDialog } from '../appointment-dialog';

@Component({
  selector: 'app-appointment-detail-view-component',
  templateUrl: './appointment-detail-view.component.html',
  styleUrls: ['./appointment-detail-view.component.scss']
})
export class AppointmentDetailViewComponent extends AppointmentDialog implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AppointmentDetailViewComponent, MatDialogRef<AppointmentEditViewComponent>>,
    @Inject(MAT_DIALOG_DATA) appointment: AppointmentModel,
    private dialog: MatDialog
  ) {
    super(appointment);
  }

  ngOnInit(): void {}

  public closeDialog(editDialogRef?: MatDialogRef<AppointmentEditViewComponent>): void {
    this.dialogRef.close(editDialogRef);
  }

  public activateEditMode(): void {
    // this._editMode = true;
    const dialogRef = this.dialog.open(AppointmentEditViewComponent, {
      maxHeight: '95vh',
      maxWidth: '95vw',
      width: '40em',
      data: this.appointment,
      autoFocus: false,
      panelClass: 'appointment-dialog',
      disableClose: true
    });

    this.closeDialog(dialogRef);
  }

}
