import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SpecializationModel } from 'src/app/services/state-services/specialization/specialization-model';
import {FormControl} from '@angular/forms';
import { FilterAppointmentsService } from 'src/app/services/filter-service/filter-appointments.service';
import { SpecializationStateService } from 'src/app/services/state-services/specialization/specialization-state.service';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-filter-specializations',
  templateUrl: './filter-specializations.component.html',
  styleUrls: ['./filter-specializations.component.scss']
})
export class FilterSpecializationsComponent implements OnInit {

  @ViewChild('inputSpecialization') inputSpecialization: ElementRef | undefined;

  get filteredSpecializationsList(): Observable<Array<SpecializationModel>> {
    return this._filteredSpecializationsList;
  }
  private _filteredSpecializationsList: Observable<Array<SpecializationModel>>;
  private _specializationsList: Array<SpecializationModel>;

  get selectedSpecializations(): ReadonlyArray<SpecializationModel> {
    return this.filterAppointment.specializationSelection;
  }
  get specializationControl(): FormControl {
    return this._specializationControl;
  }
  private _specializationControl: FormControl;

  constructor(
    private filterAppointment: FilterAppointmentsService,
    private specializationsState: SpecializationStateService
  ) {
    this._specializationsList = new Array<SpecializationModel>();
    this._filteredSpecializationsList = new Observable<Array<SpecializationModel>>();
    this._specializationControl = new FormControl();
  }

  ngOnInit(): void {
    this.loadSpecilizationsList();
    this._filteredSpecializationsList = this._specializationControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterSpecializations(value))
    );
  }

  private async loadSpecilizationsList(): Promise<void> {
    this._specializationsList = await this.specializationsState.getStateData();
  }

  private filterSpecializations(value: string): Array<SpecializationModel> {
    try {
      const filterValue = value.toLocaleLowerCase();
      return this._specializationsList.filter(
        specialization =>
          specialization.description.toLocaleLowerCase().indexOf(filterValue) === 0 &&
          !this.filterAppointment.isSpecializationSelected(specialization)
      );
    } catch {
      return this._specializationsList;
    }
  }

  public addSpecializationFilter(event: any): void {
    console.log(event);

    this._specializationControl.setValue(null);
  }

  public selectedSpecializationFilter(event: MatAutocompleteSelectedEvent): void {
    this.filterAppointment.selectSpecialization(event.option.value);

    this._specializationControl.setValue(null);
    this._specializationControl.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    if (this.inputSpecialization === undefined) {
      return;
    }
    this.inputSpecialization.nativeElement.value = '';
  }

  public removeSpecialization(specialization: SpecializationModel): void {
    this.filterAppointment.unselectSpecialization(specialization);
  }

}
