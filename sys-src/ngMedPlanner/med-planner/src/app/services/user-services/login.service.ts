import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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
     * @returns Promise with call result.
     */
    public async login(_email: string, _password: string): Promise<LoginResult> {
        try {
            const response = await this.httpService.postMessage<{result: string}>(
                HttpService.LOGIN_URL,
                {
                  email: _email,
                  password: _password
                }
            );

            this.storeToken(response.result);
        } catch (error) {

            if (error.status === HttpService.HTTP_403_FORBIDDEN) {
                return LoginResult.PASSWORD_IS_WRONG;
            }

            if (error.status === HttpService.HTTP_404_NOT_FOUND) {
                return LoginResult.USER_DOES_NOT_EXIST;
            }

            return LoginResult.SERVER_ERROR;
        }

        return LoginResult.LOGIN_SUCCESFULL;
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
    LOGIN_SUCCESFULL,
    SERVER_ERROR,
    UNKNOWN_ERROR
}
