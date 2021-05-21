

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

    get specialization(): null {
        return null;
    }

    get surgery(): null {
        return null;
    }

    constructor(private data: {
        id: number;
        first_name: string;
        surname: string;
        specialization_id: number;
        surgery_id: number;
    }) {

    }

}
