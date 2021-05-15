import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserMock } from '../data-interfaces/data-interfaces';
import { HttpService } from '../http-service/http.service';

@Injectable({
    providedIn: 'root',
})
export class UserStateService {

    get loggedIn(): boolean {
        return this._token !== null;
    }

    get token(): string | null {
        return this._token;
    }
    private _token: string | null;

    constructor(private httpService: HttpService, private router: Router) {
        this._token = null;
    }

    public async login(_email: string, _password: string, _mockCall = false): Promise<boolean> {
        if (_mockCall) {
            return this.loginMockCall(_email, _password);
        }

        // TODO: To implement true server request.
        return new Promise<boolean>( (resolve) => {
            resolve(false);
        });
    }

    public async logout(): Promise<boolean> {
        this._token = null;

        await this.router.navigate(['login']);

        return true;
    }

    private async loginMockCall(_email: string, _password: string): Promise<boolean> {
        // get mock users' data
        const callResult = await this.httpService.requestData<{ users: Array<UserMock> }>(
            HttpService.MOCK_DATA_USERS_URL
        );

        // Simulate server answer timeout
        await new Promise<void>( (resolve) => {
            setTimeout( () => { resolve(); }, 1500);
        });

        // Check login data
        for (const user of callResult.users) {
            if (user.email === _email && user.password === _password) {
                this.setToken('some_token');
                return true;
            }
        }

        return false;
    }

    private setToken(_token: string): void {
        this._token = _token;
    }

}
