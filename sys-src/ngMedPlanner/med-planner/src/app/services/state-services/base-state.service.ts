import { UserStateService } from '../user-services/user-state.service';


export abstract class BaseStateService <T extends Model> {

    protected _stateData: Array<T> | null = null;

    constructor(userState: UserStateService) {
        userState.setOnLogoutListener( () => {
            this.onLogout();
        });
    }

    /**
     * Returns List with state data of T.
     * @returns List of T with state data.
     */
    public async getStateData(): Promise<Array<T>> {
        if (this._stateData === null) {
            this._stateData = new Array<T>();
            await this.initStateData();
        }

        return this._stateData as Array<T>;
    }

    /**
     * Returns model object by id value or null if not found.
     * @param id Id of model to find.
     * @returns model of type T or null.
     */
    public async getModelById(id: number): Promise<T | null> {
        const dataList = await this.getStateData();

        for (const data of dataList) {
            if (data.id === id) {
                return data;
            }
        }

        return null;
    }

    protected addData(data: T): void {
        this._stateData?.push(data);
    }

    private onLogout(): void {
        this.clearStateData();
    }

    private clearStateData(): void {
        if (this._stateData === null) {
            return;
        }
        this._stateData.length = 0;
        this._stateData = null;
    }

    protected abstract initStateData(): Promise<void>;

}

interface Model {
    id: number;
}
