import { AppointmentModel, Priority } from 'src/app/services/state-services/appointments-dashboard/appointment-model';

export abstract class AppointmentDialog {

    get priority(): Priority {
        return this.appointment.priority;
    }

    get city(): string | undefined {
        return this.appointment.city;
    }

    get address(): string | undefined {
        return this.appointment.address;
    }

    get doctorsPhoneNumber(): string | undefined {
        return this.appointment.doctorsPhoneNumber;
    }

    get title(): string {
        return this.appointment.title;
    }

    get date(): string {
        return this.appointment.dateString;
    }

    get time(): string {
        return this.appointment.timeString;
    }

    get doctorName(): string | undefined {
        return this.appointment.doctorName;
    }

    get note(): string | undefined {
        return this.appointment.note;
    }

    constructor(protected appointment: AppointmentModel) {}
}
