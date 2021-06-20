import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HttpService {

    private static readonly serverHost: string = environment.serverHost;

    public static readonly HTTP_403_FORBIDDEN = 403;
    public static readonly HTTP_404_NOT_FOUND = 404;
    public static readonly HTTP_200_OK = 200;
    public static readonly HTTP_500_INTERNAL_SERVER_ERROR = 500;

    public static readonly APPOINTMENTS_URL = 'assets/mock-data/appointments-list.json';
    public static readonly TAGS_URL = 'assets/mock-data/tags-list.json';
    public static readonly DOCTORS_URL = 'assets/mock-data/doctors_list.json';
    public static readonly SURGERIES_URL = 'assets/mock-data/surgery-list.json';
    public static readonly SPECIALIZATIONS_URL = 'assets/mock-data/specialization-list.json';

    public static readonly MOCK_DATA_USERS_URL = 'assets/mock-data/users-list.json';

    public static readonly LOGIN_URL = `http://${HttpService.serverHost}:8000/api/login`;
    public static readonly LOGOUT_URL = `http://${HttpService.serverHost}:8000/api/logout`;
    public static readonly REGISTER_NEW_USER_URL = `http://${HttpService.serverHost}:8000/api/new-user`;

    public static readonly DOCTOR_LIST = `http://${HttpService.serverHost}:8000/api/doctor-list`;
    public static readonly DOCTOR_DETAIL = `http://${HttpService.serverHost}:8000/api/doctor-detail/`;
    public static readonly DOCTOR_UPDATE = `http://${HttpService.serverHost}:8000/api/doctor-update/`;
    public static readonly DOCTOR_CREATE = `http://${HttpService.serverHost}:8000/api/doctor-create`;
    public static readonly DOCTOR_DELETE = `http://${HttpService.serverHost}:8000/api/doctor-delete/`;

    public static readonly APPOINTMENT_LIST = `http://${HttpService.serverHost}:8000/api/appointment-list`;
    public static readonly APPOINTMENT_DETAIL = `http://${HttpService.serverHost}:8000/api/appointment-detail/`;
    public static readonly APPOINTMENT_UPDATE = `http://${HttpService.serverHost}:8000/api/appointment-update/`;
    public static readonly APPOINTMENT_CREATE = `http://${HttpService.serverHost}:8000/api/appointment-create`;
    public static readonly APPOINTMENT_DELETE = `http://${HttpService.serverHost}:8000/api/appointment-delete/`;

    constructor(private http: HttpClient) {}

    async getData<T>(_url: string, token: string | null, body?: any): Promise<T> {
        const response = await fetch(
            _url,
            {
                method: 'GET',
                headers:
                {
                    'Content-type': 'application/json',
                    Authorization: `Token ${token}`
                },
                body
            }
        );

        const data = await response.json();

        return new Promise<T>( (resolve) => { resolve(data as T); } );
    }

    async requestData<T>(url: string, token: string | null): Promise<T> {
        const promise = this.http.get<T>(
            url,
            {
                responseType: 'json',
                headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: `Token ${token}`
                })
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
            // JSON.stringify(body),
            {
                responseType: 'json',
                headers: new HttpHeaders({ 'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8'})
            }
        )
        .toPromise();

        return promise;
    }

    async putMessage<T>(_url: string, body: any, headers?: any): Promise<T> {
        // console.log('URL', _url);
        const promise = this.http.put<T>(
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
