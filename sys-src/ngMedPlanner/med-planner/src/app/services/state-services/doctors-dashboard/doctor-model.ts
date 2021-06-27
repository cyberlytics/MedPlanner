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

    get specializations(): Array<SpecializationModel | null> | null {

        return this.data.specializations;
    }

    get specializationColor(): string | null | undefined {
        if (this.data.specializations && this.data.specializations?.length >= 1) {
            return this.data.specializations[0]?.color;
        }
        

        return null;
    }

    get specialization(): string| null | undefined{
        
        if (this.data.specializations?.length === 1) {
            return this.data.specializations[0]?.description;
        }

        return null;        
    } 

    get surgery(): SurgeryModel | null {
        return this.data.surgery;
    }

    get city(): string | undefined {
        return this.data.surgery?.city;
    }

    get zipcode(): string | undefined {
        return this.data.surgery?.zipcode;
    }

    get address(): string | undefined {
        return this.data.surgery?.address;
    }

    get phoneNumber(): string | undefined {
        return this.data.surgery?.telephoneNumber;
    }

    constructor(private data: {
        id: number;
        first_name: string;
        surname: string;
        specializations: Array<SpecializationModel | null> | null;
        surgery: SurgeryModel | null;
    }) {

    }

    public isInCity(city: CityModel): boolean {
        return this.data.surgery?.cityModel === city;
    }

}
