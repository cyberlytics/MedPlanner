import { AppointmentModel, Priority } from './appointment-model';
import { Injectable } from '@angular/core';
import { AppointmentsDataService } from '../../data/appointments-data.service';
import { DoctorsDashboardStateService } from '../doctors-dashboard/doctors-dashboard-state.service';
import { TagsStateService } from '../tags/tags-state.service';
import { BaseStateService } from '../base-state.service';
import { UserStateService } from '../../user-services/user-state.service';
import { FilterAppointmentsService } from '../../filter-service/filter-appointments.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentsDashboardStateService extends BaseStateService<AppointmentModel> {

    get filteredAppointments(): Promise<ReadonlyArray<AppointmentModel>> {
        return this.filterAppointments();
    }

    constructor(
        private appointmentsData: AppointmentsDataService,
        private doctorsState: DoctorsDashboardStateService,
        private tagsState: TagsStateService,
        private appointmentFilter: FilterAppointmentsService,
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

    private async filterAppointments(): Promise<Array<AppointmentModel>> {
        const allAppointments = await this.getStateData();

        if (this.appointmentFilter.isFilterEmpty) {
            return allAppointments;
        }

        const filteredAppointments = new Array<AppointmentModel>();

        for (const appointment of allAppointments) {
            if (!this.isMatchByPriority(appointment)) {
                continue;
            }

            filteredAppointments.push(appointment);
        }

        return filteredAppointments;
    }

    private isMatchByPriority(appointment: AppointmentModel): boolean {
        if (
            !this.appointmentFilter.isHighPrioritySelected &&
            !this.appointmentFilter.isMediumPrioritySelected &&
            !this.appointmentFilter.isLowPrioritySelected
        ) {
            return true;
        }

        switch (appointment.priority) {
            case Priority.HIGH:
                return this.appointmentFilter.isHighPrioritySelected;
            case Priority.MEDIUM:
                return this.appointmentFilter.isMediumPrioritySelected;
            case Priority.LOW:
                return this.appointmentFilter.isLowPrioritySelected;
        }
    }

}

