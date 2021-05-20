import { Injectable } from '@angular/core';
import { DoctorMock } from '../data-interfaces/data-interfaces';
import { HttpService } from '../http-service/http.service';
import { DataServiceBasic } from './data-basic.service';

@Injectable({
    providedIn: 'root',
})
export class DoctorDataService extends DataServiceBasic<Doctors> {

    constructor(httpService: HttpService) {
        super(
            httpService,
            {
                requestURL: HttpService.DOCTORS_URL
            }
        );
    }

}

export interface Doctors {
    doctors: Array<DoctorMock>;
}
