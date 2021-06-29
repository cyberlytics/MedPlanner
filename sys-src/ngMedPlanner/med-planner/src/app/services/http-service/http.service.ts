import { Injectable } from '@angular/core';
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
    public static readonly SEND_EMAIL = `http://${HttpService.serverHost}:8000/api/send_email`;

    constructor() {}

    async getData<T>(url: string, token: string | null, body?: any): Promise<T> {
        const response = await fetch(
            url,
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

    async postMessage<T = any, R = any>(url: string, body: R, token: string | null): Promise<T> {
        const responce = await fetch(
            url,
            {
                method: 'POST',
                headers:
                {
                    'Content-Type':  'application/json',
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify(body)
            }
        );

        const data = await responce.json();

        return new Promise<T>( (resolve) => { resolve(data as T); });
    }

    async postUnauthorizedMessage<T extends ResponseData>(url: string, body: any): Promise<T> {
        const responce = await fetch(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify(body)
            }
        );

        const data = await responce.json();

        return new Promise<T>( (resolve) => { resolve(data as T); });
    }

    async delete<R = any>(url: string, body: R, token: string | null): Promise<Response> {
        return fetch(
            url,
            {
                method: 'DELETE',
                headers:
                {
                    'Content-Type':  'application/json',
                    Authorization: `Token ${token}`
                },
                body: JSON.stringify(body)
            }
        );
    }

}


interface ResponseData {
    message: string;
    status: number;
}
