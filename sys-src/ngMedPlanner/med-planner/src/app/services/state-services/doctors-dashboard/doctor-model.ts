import { SpecializationModel } from '../specialization/specialization-model';
import { CityModel } from '../surgery/city-model';
import { SurgeryModel } from '../surgery/surgery-model';


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

    get specializationColor(): string | null | undefined {
        return this.data.specialization?.color;
    }

    get surgery(): SurgeryModel | null {
        return this.data.surgery;
    }

    constructor(private data: {
        id: number;
        first_name: string;
        surname: string;
        specialization: SpecializationModel | null;
        surgery: SurgeryModel | null;
    }) {

    }

    public isInCity(city: CityModel): boolean {
        return this.data.surgery?.city === city;
    }

}
