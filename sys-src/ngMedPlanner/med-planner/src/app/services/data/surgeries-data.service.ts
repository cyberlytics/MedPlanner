import { Injectable } from '@angular/core';
import { SurgeryData } from '../data-interfaces/data-interfaces';
import { HttpService } from '../http-service/http.service';
import { DataServiceBasic } from './data-basic.service';

@Injectable({
    providedIn: 'root',
})
export class SurgeriesDataService extends DataServiceBasic<Array<SurgeryData>> {

    constructor(httpService: HttpService) {
        super(
            httpService,
            {
                requestURL: HttpService.SURGERIES_URL
            }
        );
    }

}

