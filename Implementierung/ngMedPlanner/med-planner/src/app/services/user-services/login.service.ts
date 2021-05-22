import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserMock } from '../data-interfaces/data-interfaces';
import { HttpService } from '../http-service/http.service';

@Injectable({
    providedIn: 'root',
})
export class LoginService implements Login {

    private readonly USER_TOKEN_KEY = 'user_token';

    get token(): string | null {
        return this._token;
    }
    private _token: string | null = null;

    get isLoggedIn(): boolean {
        return this._token !== null;
    }

    constructor(private httpService: HttpService, private router: Router) {
        const storedToken = localStorage.getItem(this.USER_TOKEN_KEY);
        this._token = storedToken ? storedToken : null;
    }

    /**
     * Checks if user logged in. If logged in, then navigates to dashboard.
     * Else navigates to login component.
     * @returns void.
     */
     public checkLogin(): void {
        if (this.isLoggedIn) {
            this.router.navigate(['appointment-dashboard']);
            return;
        }

        this.router.navigate(['login']);
    }

    /**
     * Sends user login request to sever.
     * @param _email Email to login.
     * @param _password Password to login.
     * @param _mockCall Is call local mock json data?
     * @returns Promise with call result.
     */
    public async login(_email: string, _password: string): Promise<LoginResult> {
        // return this.loginMockCall(_email, _password);

        const response = await this.httpService.postMessage<any>(
            HttpService.LOGIN_URL,
            {
              username: _email,
              password: _password
            }
        ).catch( (result) => {
            console.error(result);
            return LoginResult.USER_DOES_NOT_EXIST;
        });

        // TODO: Rewrite logic, now is just pseude checking.
        console.log('response', response);

        if (response.result) {
            this.storeToken(response.result);
            return LoginResult.LOGIN_SUCCESFULL;
        }

        if (response.error === 'User does not exist') {
            return LoginResult.USER_DOES_NOT_EXIST;
        }

        if (response.error === 'Password is wrong') {
            return LoginResult.PASSWORD_IS_WRONG;
        }

        return LoginResult.USER_DOES_NOT_EXIST;
    }
    /**
     * Logs out the user from app.
     * @returns Promise with logout result.
     */
    public async logout(): Promise<boolean> {
        this.removeToken();
        await this.router.navigate(['login']);

        return true;
    }

    private async loginMockCall(_email: string, _password: string): Promise<LoginResult> {
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
            if (user.email === _email) {
                return this.mockCheckUser({
                    user,
                    password: _password
                });
            }
        }

        return LoginResult.USER_DOES_NOT_EXIST;
    }

    private mockCheckUser(data: {
        user: UserMock,
        password: string
    }): LoginResult {
        if (data.user.password !== data.password) {
            return LoginResult.PASSWORD_IS_WRONG;
        }

        this.storeToken('some_token');
        return LoginResult.LOGIN_SUCCESFULL;
    }

    private storeToken(_token: string): void {
        this._token = _token;
        localStorage.setItem(this.USER_TOKEN_KEY, _token);
    }

    private removeToken(): void {
        this._token = null;
        localStorage.removeItem(this.USER_TOKEN_KEY);
    }

}

export interface Login {
    token: string | null;
    isLoggedIn: boolean;

    login(_email: string, _password: string): Promise<LoginResult>;
    logout(): Promise<boolean>;
}

export enum LoginResult {
    USER_DOES_NOT_EXIST,
    PASSWORD_IS_WRONG,
    LOGIN_SUCCESFULL
}
