

export class CityModel {

    get city(): string {
        return this.data.city;
    }

    get postcode(): string {
        return this.data.postcode;
    }

    constructor(private data: {
        city: string,
        postcode: string
    }) {}

}
