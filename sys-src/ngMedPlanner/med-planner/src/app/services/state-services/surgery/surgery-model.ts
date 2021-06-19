import { CityModel } from './city-model';


export class SurgeryModel {

    get id(): number {
        return this.data.id;
    }

    get city(): CityModel {
        return this.data.city;
    }
   
    get address(): string {
        return this.data.address;
    }

    get telephoneNumber(): string {
        return this.data.telephoneNumber;
    }

    get website(): string {
        return this.data.website;
    }

    get description(): string | undefined {
        return this.data.desciption;
    }

    constructor(private data: {
        id: number,
        city: CityModel,
        address: string,
        telephoneNumber: string,
        website: string,
        desciption?: string
    }) {}

}
