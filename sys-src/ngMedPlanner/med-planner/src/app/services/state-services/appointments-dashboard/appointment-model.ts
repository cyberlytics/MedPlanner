import { DoctorModel } from '../doctors-dashboard/doctor-model';
import { TagModel } from '../tags/tag-model';


export class AppointmentModel {

    get id(): number {
        return this.data.id;
    }

    get title(): string {
        return this.data.title;
    }

    get datetime(): string {
        return this.data.datetime;
    }

    get doctor(): DoctorModel | null {
        return this.data.doctor;
    }

    get doctorName(): string | undefined {
        return `${this.data.doctor?.firstName} ${this.data.doctor?.surname}`;
    }

    get doctorSpecializationColor(): string | null | undefined {
        return this.data.doctor?.specializationColor;
    }

    get priority(): Priority {
        return this.data.priority;
    }

    get note(): string {
        return this.data.note;
    }

    get tags(): Array<TagModel> | undefined {
        return this.data.tags;
    }

    constructor(private data: {
        id: number;
        title: string;
        datetime: string;
        doctor: DoctorModel | null;
        priority: Priority;
        note: string;
        tags?: Array<TagModel>;
    }) {}

    public static getPriorityByName(_name: string): Priority {
        switch (_name) {
            case 'Hoch': return Priority.HIGH;
            case 'Mittel': return Priority.MEDIUM;
            case 'Niedrig': return Priority.LOW;
            default: return Priority.LOW;
        }
    }

}

export enum Priority {
    HIGH,
    MEDIUM,
    LOW
}
