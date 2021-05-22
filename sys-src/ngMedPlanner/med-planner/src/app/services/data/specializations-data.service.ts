import { Injectable } from '@angular/core';
import { SpecializationMock } from '../data-interfaces/data-interfaces';
import { HttpService } from '../http-service/http.service';
import { DataServiceBasic } from './data-basic.service';

@Injectable({
    providedIn: 'root',
})
export class SpecializationsDataService extends DataServiceBasic<Array<SpecializationMock>> {

    constructor(httpService: HttpService) {
        super(
            httpService,
            {
                requestURL: HttpService.SPECIALIZATIONS_URL
            }
        );
    }

}

