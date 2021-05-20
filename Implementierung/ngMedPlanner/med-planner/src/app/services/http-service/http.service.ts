import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class HttpService {

    public static readonly APPOINTMENTS_URL = 'assets/mock-data/appointments-list.json';
    public static readonly DOCTORS_URL = 'assets/mock-data/doctors_list.json';
    public static readonly SURGERIES_URL = 'assets/mock-data/surgery-list.json';
    public static readonly SPECIALIZATIONS_URL = 'assets/mock-data/specialization-list.json';


    public static readonly MOCK_DATA_USERS_URL = 'assets/mock-data/users-list.json';

    constructor(private http: HttpClient) {}

    async requestData<T>(_url: string): Promise<T> {
        const promise = this.http.get<T>(
            _url,
            {
                responseType: 'json'
            }
        ).toPromise();

        return promise;
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
