

export class SpecializationModel {

    get id(): number {
        return this.data.id;
    }

    get description(): string {
        return this.data.description;
    }

    constructor(private data: {
        id: number,
        description: string
    }) {}

}
