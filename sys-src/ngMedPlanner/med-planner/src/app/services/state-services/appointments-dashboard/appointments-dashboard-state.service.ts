import { AppointmentModel, AppointmentUpdateData, Priority } from './appointment-model';
import { Injectable } from '@angular/core';
import { AppointmentsDataService } from '../../data/appointments-data.service';
import { DoctorsDashboardStateService } from '../doctors-dashboard/doctors-dashboard-state.service';
import { TagsStateService } from '../tags/tags-state.service';
import { BaseStateService } from '../base-state.service';
import { UserStateService } from '../../user-services/user-state.service';
import { FilterAppointmentsService } from '../../filter-service/filter-appointments.service';
import { HttpService } from '../../http-service/http.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentsDashboardStateService extends BaseStateService<AppointmentModel> {

    get filteredAppointments(): Promise<ReadonlyArray<AppointmentModel>> {
        return this.filterAppointments();
    }

    constructor(
        private httpService: HttpService,
        private appointmentsData: AppointmentsDataService,
        private doctorsState: DoctorsDashboardStateService,
        private tagsState: TagsStateService,
        private appointmentFilter: FilterAppointmentsService,
        private userState: UserStateService
    ) {
        super(userState);
    }

    public async addNewAppointment(appointment: AppointmentModel): Promise<CreateAppontmentResult> {
        const result = await this.httpService.postMessage<{ id: number | undefined }, CreateAppointmentRequestData>(
            HttpService.APPOINTMENT_CREATE,
            {
                title: appointment.title,
                doc_id: appointment.doctor?.id,
                user_id: 1,
                datetime: appointment.dateISOString,
                priority: appointment.priority,
                tags: []
            },
            this.userState.token
        );

        if (!result.id) {
            return CreateAppontmentResult.NOT_CREATED;
        }

        appointment.resetIdAfterSave(result.id);
        appointment.setOnUpdateListener( (model: AppointmentModel) => {
            this.updateAppointment(model);
        });
        appointment.setOnDeleteListener( (model: AppointmentModel) => {
            this.deleteAppointment(model);
        });
        this.addModel(appointment);

        return CreateAppontmentResult.CREATED;
    }

    protected async initStateData(): Promise<void> {
        const appointmentsData = await this.appointmentsData.getData();

        for (const appointment of appointmentsData) {
            this.addModel(
                new AppointmentModel(
                    {
                        id: appointment.id,
                        title: appointment.title,
                        datetime: appointment.datetime,
                        doctor: await this.doctorsState.getModelById(appointment.doc_id),
                        priority: AppointmentModel.getPriorityByName(appointment.priority),
                        note: appointment.note,
                        tags: await this.tagsState.getTagListByIds(appointment.tags),
                        onAppointmentUpdate: (model: AppointmentModel) => { this.updateAppointment(model); },
                        onAppointmentDelete: (model: AppointmentModel) => { this.deleteAppointment(model); }
                    }
                )
            );
        }
    }

    private async deleteAppointment(appointment: AppointmentModel): Promise<void> {
        const responce = await this.httpService.delete(
            HttpService.APPOINTMENT_DELETE + appointment.id,
            null,
            this.userState.token
        );

        if (responce.ok) {
            this.removeModelById(appointment.id);
        }
    }

    private async updateAppointment(appointment: AppointmentModel): Promise<void> {
        const updateResult = await this.httpService.postMessage<any, CreateAppointmentRequestData>(
            HttpService.APPOINTMENT_UPDATE + appointment.id,
            {
                priority: appointment.priority,
                title: appointment.title,
                doc_id: appointment.doctor?.id,
                datetime: appointment.dateISOString,
                user_id: 1,
                note: appointment.note,
                tags: []
            },
            this.userState.token
        );
    }

    private async filterAppointments(): Promise<Array<AppointmentModel>> {
        const allAppointments = await this.getStateData();

        allAppointments.sort((a, b) => {
            return a.date.getTime() - b.date.getTime();
        });

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

interface CreateAppointmentRequestData {
    title: string;
    doc_id: number | undefined;
    user_id: number;
    datetime: string;
    priority: 'Hoch' | 'Mittel' | 'Niedrig';
    note?: string;
    tags?: Array<number>;
}

enum CreateAppontmentResult {
    CREATED,
    NOT_CREATED
}

