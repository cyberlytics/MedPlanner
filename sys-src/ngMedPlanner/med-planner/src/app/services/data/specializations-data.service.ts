import { Injectable } from '@angular/core';
import { SpecializationData } from '../data-interfaces/data-interfaces';
import { HttpService } from '../http-service/http.service';
import { UserStateService } from '../user-services/user-state.service';
import { DataServiceBasic } from './data-basic.service';

@Injectable({
    providedIn: 'root',
})
export class SpecializationsDataService extends DataServiceBasic<Array<SpecializationData>> {

    constructor(httpService: HttpService, userState: UserStateService) {
        super(
            httpService,
            {
                requestURL: HttpService.SPECIALIZATION_LIST
            },
            userState
        );
    }

}

interface Specializations {
    specializations: Array<SpecializationData>;
}

