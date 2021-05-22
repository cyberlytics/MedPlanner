import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { DataServiceBasic } from './data-basic.service';

import { AppointmentMock } from '../data-interfaces/data-interfaces';

@Injectable({
    providedIn: 'root',
})
export class AppointmentsDataService extends DataServiceBasic<AppointmentsData> {

    constructor(httpService: HttpService) {
        super(
            httpService,
            {
                requestURL: HttpService.APPOINTMENTS_URL
            }
        );
    }

}

interface AppointmentsData {
    appointments: Array<AppointmentMock>;
}
