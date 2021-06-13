import { DoctorModel } from '../doctors-dashboard/doctor-model';
import { TagModel } from '../tags/tag-model';


export class AppointmentModel {

    private static readonly LOCALE_DE = 'de-DE';

    get id(): number {
        return this.data.id;
    }

    get title(): string {
        return this.data.title;
    }

    get date(): Date {
        return this._date;
    }

    get dateString(): string {
        return this._date.toLocaleDateString(AppointmentModel.LOCALE_DE, {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
    }

    get timeString(): string {
        return this._date.toLocaleTimeString(AppointmentModel.LOCALE_DE, {
          hour: '2-digit',
          minute: '2-digit'
        });
      }

    get doctor(): DoctorModel | null {
        return this.data.doctor;
    }

    get doctorName(): string | undefined {
        return `${this.data.doctor?.firstName} ${this.data.doctor?.surname}`;
    }

    get doctorsPhoneNumber(): string | undefined {
        return this.data.doctor?.phoneNumber;
    }

    get doctorSpecializationColor(): string | null | undefined {
        return this.data.doctor?.specializationColor;
    }

    get priority(): Priority {
        return this.data.priority;
    }

    get note(): string | undefined {
        return this.data?.note;
    }

    get tags(): Array<TagModel> | undefined {
        return this.data.tags;
    }

    get city(): string | undefined {
        return this.doctor?.city;
    }

    get address(): string | undefined {
        return this.doctor?.address;
    }

    private _date: Date;

    constructor(private data: {
        id: number;
        title: string;
        datetime: string;
        doctor: DoctorModel | null;
        priority: Priority;
        note?: string;
        tags?: Array<TagModel>;
    }) {
        this._date = new Date(data.datetime);
    }

    public static getPriorityByName(_name: string): Priority {
        switch (_name) {
            case 'Hoch': return Priority.HIGH;
            case 'Mittel': return Priority.MEDIUM;
            case 'Niedrig': return Priority.LOW;
            default: return Priority.LOW;
        }
    }

    public hasTag(tag: TagModel): boolean {
        if (!this.data.tags) {
            return false;
        }

        return this.data.tags.includes(tag);
    }

    public isInDateRange(startDate: Date | null, endDate: Date | null): boolean {
        if (startDate === null) {
            return false;
        }

        if (endDate === null) {
            return false;
        }

        return (
            startDate.getTime() < this._date.getTime() &&
            this._date.getTime() < endDate.getTime()
        );
    }

    public updateAppointment(dataToUpdate?: {
        title?: string;
        datetime?: string;
        date?: Date;
        doctor?: DoctorModel;
        priority?: Priority;
        note?: string;
        tags?: Array<TagModel>;
    }): void {
        if (dataToUpdate === undefined) {
            // TODO: trigger server to update appointment
            return;
        }

        if (dataToUpdate.title !== undefined) {
            this.data.title = dataToUpdate.title;
        }

        if (dataToUpdate.datetime !== undefined) {
            this.data.datetime = dataToUpdate.datetime;
            this._date = new Date(dataToUpdate.datetime);
        }

        if (dataToUpdate.date !== undefined) {
            this._date = dataToUpdate.date;
        }

        if (dataToUpdate.doctor !== undefined) {
            this.data.doctor = dataToUpdate.doctor;
        }

        if (dataToUpdate.priority !== undefined) {
            this.data.priority = dataToUpdate.priority;
        }

        if (dataToUpdate.note !== undefined) {
            this.data.note = dataToUpdate.note;
        }

        if (dataToUpdate.tags !== undefined) {
            this.data.tags = dataToUpdate.tags;
        }

        // TODO: trigger server to update appointment
    }

}

export enum Priority {
    HIGH,
    MEDIUM,
    LOW
}
