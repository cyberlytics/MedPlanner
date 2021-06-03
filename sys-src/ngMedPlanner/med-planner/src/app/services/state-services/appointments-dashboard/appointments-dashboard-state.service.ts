import { AppointmentModel } from './appointment-model';
import { Injectable } from '@angular/core';
import { AppointmentsDataService } from '../../data/appointments-data.service';
import { DoctorsDashboardStateService } from '../doctors-dashboard/doctors-dashboard-state.service';
import { TagsStateService } from '../tags/tags-state.service';
import { BaseStateService } from '../base-state.service';
import { UserStateService } from '../../user-services/user-state.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentsDashboardStateService extends BaseStateService<AppointmentModel> {

    constructor(
        private appointmentsData: AppointmentsDataService,
        private doctorsState: DoctorsDashboardStateService,
        private tagsState: TagsStateService,
        userState: UserStateService
    ) {
        super(userState);
    }

    protected async initStateData(): Promise<void> {
        const appointmentsData = await this.appointmentsData.getData();

        for (const appointment of appointmentsData.appointments) {
            this.addData(
                new AppointmentModel(
                    {
                        id: appointment.id,
                        title: appointment.title,
                        datetime: appointment.datetime,
                        doctor: await this.doctorsState.getModelById(appointment.doc_id),
                        priority: AppointmentModel.getPriorityByName(appointment.priority),
                        note: appointment.note,
                        tags: await this.tagsState.getTagListByIds(appointment.tags)
                    }
                )
            );
        }
    }

}

