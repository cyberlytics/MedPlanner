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

            if (!this.isMatchByDoctorSpecialization(appointment)) {
                continue;
            }

            if (!this.isMatchByCity(appointment)) {
                continue;
            }

            if (!this.isMatchByTag(appointment)) {
                continue;
            }

            if (!this.isMatchByDateRange(appointment)) {
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

    private isMatchByDoctorSpecialization(appointment: AppointmentModel): boolean {
        if (this.appointmentFilter.specializationSelection.length === 0) {
            return true;
        }

        const doctor = appointment.doctor;

        if (!doctor) {
            return false;
        }

        if (doctor.specializations === null) {
            return false;
        }

        for (const specialization of doctor.specializations) {
            if (specialization === null) {
                continue;
            }

            if (this.appointmentFilter.isSpecializationSelected(specialization)) {
                return true;
            }
        }

        return false;
    }

    private isMatchByCity(appointment: AppointmentModel): boolean {
        if (this.appointmentFilter.citySelection.length === 0) {
            return true;
        }

        for (const cityModel of this.appointmentFilter.citySelection) {
            if (appointment.doctor?.isInCity(cityModel)) {
                return true;
            }
        }

        return false;
    }

    private isMatchByTag(appointment: AppointmentModel): boolean {
        if (this.appointmentFilter.tagsSelection.length === 0) {
            return true;
        }

        for (const tagModel of this.appointmentFilter.tagsSelection) {
            if (appointment.hasTag(tagModel)) {
                return true;
            }
        }

        return false;
    }

    private isMatchByDateRange(appointment: AppointmentModel): boolean {
        if (!this.appointmentFilter.isDateRangeSelected()) {
            return true;
        }

        return appointment.isInDateRange(this.appointmentFilter.startDate, this.appointmentFilter.endDate);
    }
}


