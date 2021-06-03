import { HttpService } from '../http-service/http.service';
import { UserStateService } from '../user-services/user-state.service';


export abstract class DataServiceBasic<T> {

    private _loadedData: T | null = null;

    constructor(
        protected httpService: HttpService,
        private data:
        {
            requestURL: string
        },
        userState: UserStateService
    ) {
        userState.setOnLogoutListener( () => {
            this.onLogout();
        });
    }

    public async getData(): Promise<T> {
        if (this._loadedData === null) {
            this._loadedData = await this.loadDataFromServer();
        }

        return this._loadedData;
    }

    private async loadDataFromServer(): Promise<T> {
        return this.httpService.requestData<T>(this.data.requestURL);
    }

    private onLogout(): void {
        this._loadedData = null;
    }

}

