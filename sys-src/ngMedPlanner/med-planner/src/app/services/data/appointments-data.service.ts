import { Injectable } from '@angular/core';
import { HttpService } from '../http-service/http.service';
import { DataServiceBasic } from './data-basic.service';

import { AppointmentData } from '../data-interfaces/data-interfaces';
import { UserStateService } from '../user-services/user-state.service';

@Injectable({
    providedIn: 'root',
})
export class AppointmentsDataService extends DataServiceBasic<Array<AppointmentData>> {

    constructor(httpService: HttpService, userState: UserStateService) {
        super(
            httpService,
            {
                requestURL: HttpService.APPOINTMENT_LIST
            },
            userState
        );
    }

}

interface AppointmentsData {
    appointments: Array<AppointmentData>;
}
