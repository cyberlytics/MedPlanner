import { SpecializationModel } from '../specialization/specialization-model';


export class DoctorModel {

    get id(): number {
        return this.data.id;
    }

    get firstName(): string {
        return this.data.first_name;
    }

    get surname(): string {
        return this.data.surname;
    }

    get specialization(): SpecializationModel | null {
        return this.data.specialization;
    }

    get surgery(): null {
        return null;
    }

    constructor(private data: {
        id: number;
        first_name: string;
        surname: string;
        specialization: SpecializationModel | null;
        surgery_id: number;
    }) {

    }

}
