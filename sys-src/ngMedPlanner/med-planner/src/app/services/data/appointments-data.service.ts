import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { DataServiceBasic } from './data-basic.service';

import { AppointmentData } from '../data-interfaces/data-interfaces';
import { UserStateService } from '../user-services/user-state.service';

@Injectable({
    providedIn: 'root',
})
export class AppointmentsDataService extends DataServiceBasic<AppointmentsData> {

    constructor(httpService: HttpService, userState: UserStateService) {
        super(
            httpService,
            {
                requestURL: HttpService.APPOINTMENTS_URL
            },
            userState
        );
    }

}

interface AppointmentsData {
    appointments: Array<AppointmentData>;
}
