import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {

  private readonly EMAIL_REQUIRED_MESSAGE = 'Ein Email erforderlich!';
  private readonly EMAIL_WRONG_MESSAGE = 'Ein gültiges Email erforderlich!';

  private readonly PASSWORD_REQUIRED_MESSAGE = 'Ein Passwort erforderlich!';

  get emailErrorMessage(): string {
    if (this._emailFormControl.hasError('required')) {
      return this.EMAIL_REQUIRED_MESSAGE;
    }

    if (this._emailFormControl.hasError('email')) {
      return this.EMAIL_WRONG_MESSAGE;
    }

    return '';
  }

  get emailFormControl(): FormControl {
    return this._emailFormControl;
  }
  private _emailFormControl: FormControl;


  get passwordErrorMessage(): string {
    if (this._passwordFormControl.hasError('required')) {
      return this.PASSWORD_REQUIRED_MESSAGE;
    }

    return '';
  }

  get passwordFormControl(): FormControl {
    return this._passwordFormControl;
  }
  private _passwordFormControl: FormControl;


  set hidePassword(value: boolean) {
    this._hidePassword = value;
  }
  get hidePassword(): boolean {
    return this._hidePassword;
  }
  private _hidePassword: boolean;

  constructor() {
    this._emailFormControl = new FormControl('', [Validators.required, Validators.email]);
    this._passwordFormControl = new FormControl('', [Validators.required]);

    this._hidePassword = true;
  }

  ngOnInit(): void {}

  onSignUpClick(): void {
    // TODO (called on sign up text clicked)
  }

  onLogInClick(_email: string, _password: string): void {
    console.log(`Email: ${_email}; Password: ${_password}`);
    // TODO (called on log in button clicked)
  }

}
