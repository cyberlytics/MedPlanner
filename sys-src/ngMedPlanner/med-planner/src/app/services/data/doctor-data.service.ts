import { Injectable } from '@angular/core';
import { DoctorData } from '../data-interfaces/data-interfaces';
import { HttpService } from '../http-service/http.service';
import { UserStateService } from '../user-services/user-state.service';
import { DataServiceBasic } from './data-basic.service';

@Injectable({
    providedIn: 'root',
})
export class DoctorDataService extends DataServiceBasic<Doctors> {

    constructor(httpService: HttpService, userState: UserStateService) {
        super(
            httpService,
            {
                requestURL: HttpService.DOCTORS_URL
            },
            userState
        );
    }

}

export interface Doctors {
    doctors: Array<DoctorData>;
}
