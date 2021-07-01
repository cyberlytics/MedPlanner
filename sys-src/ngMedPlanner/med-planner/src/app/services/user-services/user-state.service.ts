import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { LoginResult, LoginService, Login } from './login.service';

@Injectable({
    providedIn: 'root',
})
export class UserStateService implements Login {

    private _onLogout: Subject<void>;

    get userEmail(): string | null {
        return this._userEmail;
    }
    private _userEmail: string | null = null;

    get userId(): number | null {
        return this.loginService.userId;
    }
    get token(): string | null {
        return this.loginService.token;
    }

    get isLoggedIn(): boolean {
        return this.loginService.isLoggedIn;
    }

    constructor(private loginService: LoginService) {
        this._onLogout = new Subject<void>();
    }

    /**
     * Checks if user logged in. If logged in, then navigates to dashboard.
     * Else navigates to login component.
     * @returns void.
     */
    public checkLogin(): void {
        this.loginService.checkLogin();
    }

    /**
     * Sends user login request to sever.
     * @param _email Email to login.
     * @param _password Password to login.
     * @param _mockCall Is call local mock json data?
     * @returns Promise with call result.
     */
    public async login(_email: string, _password: string): Promise<LoginResult> {
        this._userEmail = _email;
        return this.loginService.login(_email, _password);
    }
    /**
     * Logs out the user from app.
     * @returns Promise with logout result.
     */
    public async logout(): Promise<boolean> {
        const result = await this.loginService.logout();

        if (result) {
            this._onLogout.next();
        }

        return result;
    }

    public setOnLogoutListener(listener: () => void): Subscription {
        // tslint:disable-next-line: deprecation
        return this._onLogout.subscribe({
            next: () => {
                listener();
            }
        });
    }

}
