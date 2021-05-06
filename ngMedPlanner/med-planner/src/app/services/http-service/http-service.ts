import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { MeetingMock } from '../data-interfaces/data-interfaces';

@Injectable({
    providedIn: 'root',
})
export class HttpService {

    private static readonly MOCK_DATA_MEETINGS_URL = 'assets/mock-data/meeting-list.json';

    constructor(private http: HttpClient) {}

    async getMeetingList(): Promise<Array<MeetingMock>> {

        const promise = await this.http.get(HttpService.MOCK_DATA_MEETINGS_URL).toPromise();

        return new Promise<Array<MeetingMock>>( (resolve) => {
            resolve([]);
        });
    }

}

interface HttpOptions {
    headers?: HttpHeaders | {[header: string]: string | string[]};
    observe?: 'body' | 'events' | 'response';
    params?: HttpParams|{[param: string]: string | string[]};
    reportProgress?: boolean;
    responseType?: 'arraybuffer'|'blob'|'json'|'text';
    withCredentials?: boolean;
}
