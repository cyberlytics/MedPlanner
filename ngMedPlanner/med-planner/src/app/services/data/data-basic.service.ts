import { HttpService } from '../http-service/http.service';


export abstract class DataServiceBasic<T> {

    private _loadedData: T | null = null;

    constructor(
        protected httpService: HttpService,
        private data:
        {
            requestURL: string
        }
    ) {}

    public async getData(): Promise<T> {
        if (this._loadedData === null) {
            this._loadedData = await this.loadDataFromServer();
        }

        return this._loadedData;
    }

    private async loadDataFromServer(): Promise<T> {
        return this.httpService.requestData<T>(this.data.requestURL);
    }

}

