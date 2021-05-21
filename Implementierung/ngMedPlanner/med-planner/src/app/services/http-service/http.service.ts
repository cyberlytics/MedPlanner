import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as $ from 'jquery';

@Injectable({
    providedIn: 'root',
})
export class HttpService {

    public static readonly APPOINTMENTS_URL = 'assets/mock-data/appointments-list.json';
    public static readonly DOCTORS_URL = 'assets/mock-data/doctors_list.json';
    public static readonly SURGERIES_URL = 'assets/mock-data/surgery-list.json';
    public static readonly SPECIALIZATIONS_URL = 'assets/mock-data/specialization-list.json';


    public static readonly MOCK_DATA_USERS_URL = 'assets/mock-data/users-list.json';

    public static readonly LOGIN_URL = 'http://localhost:8000/api/login';
    public static readonly LOGOUT_URL = 'http://localhost:8000/api/logout';
    public static readonly REGISTER_NEW_USER_URL = 'http://localhost:8000/api/new-user';

    constructor(private http: HttpClient) {}

    async requestData<T>(_url: string, body?: any): Promise<T> {
        const promise = this.http.get<T>(
            _url,
            {
                responseType: 'json',
                headers: new HttpHeaders({ 'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'})
            }
        )
        .toPromise()
        .catch();

        return promise;
    }

    async getMessage<T>(_url: string, options?: any): Promise<T> {
        const promise = this.http.get<T>(
            _url,
            {
                responseType: 'json',
                headers: new HttpHeaders({
                    'Access-Control-Allow-Headers':  $.param(options)
                })
            }
        )
        .toPromise()
        .catch();

        return promise;
    }

    async postMessage<T>(_url: string, body: any, headers?: any): Promise<T> {
        const promise = this.http.post<T>(
            _url,
            $.param(body),
            {
                responseType: 'json',
                headers: new HttpHeaders({ 'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'})
            }
        )
        .toPromise();

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
