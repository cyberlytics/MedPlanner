

export class SpecializationModel {

    get id(): number {
        return this.data.id;
    }

    get description(): string {
        return this.data.description;
    }

    get color(): string | null {
        return this.data.color;
    }

    constructor(private data: {
        id: number,
        description: string,
        color: string;
    }) {}

    private static getColorByDescription(description: string): string | null {
        // TODO: save colors in data base ???
        switch (description) {
            case 'Neurologie': {
                return '#26a69a';
            }
            case 'Innere Medizin': {
                return '#26c6da';
            }
            case 'Orthopädie': {
                return '#66bb6a';
            }
            case 'Zahnmedizin': {
                return '#d4e157';
            }
            case 'Allgemeinmedizin': {
                return '#ffca28';
            }
            case 'Kieferorthopädie': {
                return '#ec407a';
            }
        }

        return null;
    }

}
