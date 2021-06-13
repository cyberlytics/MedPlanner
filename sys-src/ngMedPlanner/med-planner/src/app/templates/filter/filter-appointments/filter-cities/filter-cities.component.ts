import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CityModel } from 'src/app/services/state-services/surgery/city-model';
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import { FilterAppointmentsService } from 'src/app/services/filter-service/filter-appointments.service';
import { SurgeryStateService } from 'src/app/services/state-services/surgery/surgery-state.service';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-filter-cities',
  templateUrl: './filter-cities.component.html',
  styleUrls: ['./filter-cities.component.scss']
})
export class FilterCitiesComponent implements OnInit {

  @ViewChild('inputCity') inputCity: ElementRef | undefined;

  get filteredCitiesList(): Observable<ReadonlyArray<CityModel>> {
    return this._filteredCitiesList;
  }
  private _filteredCitiesList: Observable<ReadonlyArray<CityModel>>;
  private _citiesList: ReadonlyArray<CityModel>;

  get selectedCites(): ReadonlyArray<CityModel> {
    return this.filterAppointment.citySelection;
  }
  get citiesControl(): FormControl {
    return this._citiesControl;
  }
  private _citiesControl: FormControl;

  constructor(
    private filterAppointment: FilterAppointmentsService,
    private surgeryState: SurgeryStateService
  ) {
    this._citiesList = new Array<CityModel>();
    this._filteredCitiesList = new Observable<ReadonlyArray<CityModel>>();
    this._citiesControl = new FormControl();
  }

  ngOnInit(): void {
    this.loadCitiesList();
    this._filteredCitiesList = this._citiesControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCites(value))
    );
  }

  private async loadCitiesList(): Promise<void> {
    await this.surgeryState.getStateData();
    this._citiesList = this.surgeryState.cities;
  }

  private filterCites(value: string): ReadonlyArray<CityModel> {
    try {
      const filterValue = value.toLocaleLowerCase();
      return this._citiesList.filter(
        cityModel =>
          cityModel.city.toLocaleLowerCase().indexOf(filterValue) === 0 &&
          !this.filterAppointment.isCitySelected(cityModel)
      );
    } catch {
      return this._citiesList;
    }
  }

  public selectedCityFilter(event: MatAutocompleteSelectedEvent): void {
    this.filterAppointment.selectCity(event.option.value);

    this._citiesControl.setValue(null);
    this._citiesControl.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    if (this.inputCity === undefined) {
      return;
    }
    this.inputCity.nativeElement.value = '';
  }

  public removeCity(city: CityModel): void {
    this.filterAppointment.unselectCity(city);
  }

}
