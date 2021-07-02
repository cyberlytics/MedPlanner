import {Component, Input, OnInit} from '@angular/core';
import { DoctorModel } from 'src/app/services/state-services/doctors-dashboard/doctor-model';
import { DoctorDetailViewComponent } from 'src/app/templates/doctor-dashboard/doctor-card/dialogs/doctor-detail-view/doctor-detail-view.component';
import {MatDialog} from '@angular/material/dialog';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent implements OnInit {

  private _doctor: DoctorModel | null = null;

  @Input() set doctor(value: DoctorModel | null) {
    this._doctor = value;

  }
  get doctor(): DoctorModel | null {
    return this._doctor;
  }

  get doctorName(): string | undefined{
    return this._doctor?.surname;
  }

  get location(): string | undefined{
    return this._doctor?.surgery?.city;
  }

  get zipcode(): string | undefined{
    return this._doctor?.surgery?.zipcode;
  }

  get address(): string | undefined{
    return this._doctor?.surgery?.address;
  }

  get telephone(): string | undefined{
    return this._doctor?.surgery?.telephoneNumber;
  }

  get website(): string | undefined{
    return this._doctor?.surgery?.website;
  }

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  /**
   * Function creates MatDialog with associated data of the clicked "doctor-card".
   */
  public async onDetailsButtonClick(): Promise<void> {
    const dialogRef = this.dialog.open<DoctorDetailViewComponent, any, MatDialogRef<DoctorDetailViewComponent>>(
      DoctorDetailViewComponent,
      {
        maxHeight: '95vh',
        maxWidth: '95vw',
        width: '40em',
        height: 'auto',
        data: this._doctor,
        autoFocus: false,
        panelClass: 'appointment-dialog',
        disableClose: true
      }
    );
  }


}
