import { AppointmentModel } from './appointment-model';
import { Injectable } from '@angular/core';
import { AppointmentsDataService } from '../../data/appointments-data.service';
import { DoctorsDashboardStateService } from '../doctors-dashboard/doctors-dashboard-state.service';

@Injectable({
    providedIn: 'root'
})
export class AppointmentsDashboardStateService {

    private _appointments: Array<AppointmentModel> | null = null;

    constructor(
        private appointmentsData: AppointmentsDataService,
        private doctorsState: DoctorsDashboardStateService
    ) {}

    public async getAppointments(): Promise<Array<AppointmentModel>> {
        if (this._appointments === null) {
            await this.initAppointments();
        }

        return this._appointments as Array<AppointmentModel>;
    }

    private async initAppointments(): Promise<void> {
        const appointmentsData = await this.appointmentsData.getData();

        this._appointments = new Array<AppointmentModel>();

        for (const appointment of appointmentsData.appointments) {
            this._appointments.push(
                new AppointmentModel(
                    {
                        id: appointment.id,
                        title: appointment.title,
                        datetime: appointment.datetime,
                        doctor: await this.doctorsState.getDoctorById(appointment.doc_id),
                        priority: AppointmentModel.getPriorityByName(appointment.priority),
                        note: appointment.note
                    }
                )
            );
        }
    }

}

