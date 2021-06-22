

export class CityModel {

    get city(): string {
        return this.data.city;
    }

    get zipcode(): string {
        return this.data.zipcode;
    }

    constructor(private data: {
        city: string,
        zipcode: string
    }) {}

}
