import { Component, OnInit, Inject } from '@angular/core';
import { DoctorModel } from 'src/app/services/state-services/doctors-dashboard/doctor-model';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DoctorDialog } from 'src/app/templates/doctor-dashboard/doctor-card/dialogs/doctor-dialog';


@Component({
  selector: 'app-doctor-detail-view',
  templateUrl: './doctor-detail-view.component.html',
  styleUrls: ['./doctor-detail-view.component.scss']
})
export class DoctorDetailViewComponent extends DoctorDialog implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<DoctorDetailViewComponent, MatDialogRef<DoctorDetailViewComponent>>,
    @Inject(MAT_DIALOG_DATA) doctor: DoctorModel,
  ) {
    super(doctor);
  }

  ngOnInit(): void {}

  public closeDialog(editDialogRef?: MatDialogRef<DoctorDetailViewComponent>): void {
    this.dialogRef.close(editDialogRef);
  }

}
