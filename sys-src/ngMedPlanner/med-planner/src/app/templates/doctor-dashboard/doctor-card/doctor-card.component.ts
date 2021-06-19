import {Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DoctorModel } from 'src/app/services/state-services/doctors-dashboard/doctor-model';

@Component({
  selector: 'app-doctor-card',
  templateUrl: './doctor-card.component.html',
  styleUrls: ['./doctor-card.component.scss']
})
export class DoctorCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() set doctor(value: DoctorModel | null) {
    this._doctor = value;

  }
  get doctor(): DoctorModel | null {
    return this._doctor;
  }
  private _doctor: DoctorModel | null = null;

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

}
