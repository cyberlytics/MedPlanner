

export class TagModel {

    get id(): number {
        return this.data.id;
    }

    get description(): string {
        return this.data.description;
    }

    get color(): string {
        return this.data.color;
    }

    constructor(private data: {
        id: number
        description: string,
        color: string
    }) {}

}
