import { Injectable } from '@angular/core';
import { SpecializationsDataService } from '../../data/specializations-data.service';
import { SurgeriesDataService } from '../../data/surgeries-data.service';
import { UserStateService } from '../../user-services/user-state.service';
import { BaseStateService } from '../base-state.service';
import { CityModel } from './city-model';
import { SurgeryModel } from './surgery-model';

@Injectable({
    providedIn: 'root'
})
export class SurgeryStateService extends BaseStateService<SurgeryModel> {

    get cities(): ReadonlyArray<CityModel> {
        return this._cities;
    }
    private _cities: Array<CityModel>;

    constructor(
        private surgeriesData: SurgeriesDataService,
        userState: UserStateService
    ) {
        super(userState);

        this._cities = new Array();
        userState.setOnLogoutListener( () => {
            this._cities.length = 0;
        });
    }

    public async getSurgeriesByCityName(cityName: string): Promise<ReadonlyArray<SurgeryModel>> {
        const surgeries = new Array<SurgeryModel>();

        const city = this.getCityByName(cityName);

        if (city === null) {
            return [];
        }

        for (const surgery of await this.getStateData()) {
            if (surgery.cityModel === city) {
                surgeries.push(surgery);
            }
        }

        return surgeries;
    }

    protected async initStateData(): Promise<void> {
        const surgeriesData = await this.surgeriesData.getData();

        for (const surgery of surgeriesData) {
            this.addModel(
                new SurgeryModel(
                    {
                        id: surgery.id,
                        cityModel: this.createNewOrGetExistedCityByName(surgery.city, surgery.zipcode),
                        address: surgery.address,
                        telephoneNumber: surgery.telephone_num,
                        website: surgery.website,
                        desciption: surgery.description
                    }
                )
            );
        }
    }

    private createNewOrGetExistedCityByName(cityName: string, zipcode: string): CityModel {
        const existedCity = this.getCityByName(cityName);

        if (existedCity !== null) {
            return existedCity;
        }

        const newCity = new CityModel({ city: cityName, zipcode });
        this._cities.push(newCity);

        return newCity;
    }

    private getCityByName(cityName: string): CityModel | null {
        for (const city of this._cities) {
            if (city.city === cityName) {
                return city;
            }
        }

        return null;
    }

}
