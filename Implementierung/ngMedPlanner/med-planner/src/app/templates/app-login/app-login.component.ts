import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppHeaderStateService } from 'src/app/services/state-services/app-header-state.service';
import { UserStateService } from 'src/app/services/user-services/user-state.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {

  private readonly EMAIL_REQUIRED_MESSAGE = 'Ein Email erforderlich!';
  private readonly EMAIL_WRONG_MESSAGE = 'Ein gültiges Email erforderlich!';
  private readonly EMAIL_DOESNT_EXIST_MESSAGE = 'Es gibt kein Benutzer mit solchem Email';

  private readonly PASSWORD_REQUIRED_MESSAGE = 'Ein Passwort erforderlich!';
  private readonly WRONG_PASSWORD_MESSAGE = 'Das Passwort ist falsch';

  get emailErrorMessage(): string {
    if (this._emailFormControl.hasError('required')) {
      return this.EMAIL_REQUIRED_MESSAGE;
    }

    if (this._emailFormControl.hasError('email')) {
      return this.EMAIL_WRONG_MESSAGE;
    }

    if (this._emailFormControl.hasError('emailNotExist')) {
      return this.EMAIL_DOESNT_EXIST_MESSAGE;
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

    if (this._passwordFormControl.hasError('wrongInput')) {
      return this.WRONG_PASSWORD_MESSAGE;
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


  get isLoading(): boolean {
    return this._isLoading;
  }
  private _isLoading: boolean;


  constructor(
    headerState: AppHeaderStateService,
    private userState: UserStateService,
    private router: Router
  ) {
    this._emailFormControl = new FormControl(
      '',
      [Validators.required, Validators.email, EmailValidator.emailNotExist]
    );
    this._passwordFormControl = new FormControl(
      '',
      [Validators.required, PasswordValidator.wrongInput]
    );

    this._hidePassword = true;
    this._isLoading = false;

    headerState.setHeaderTitle('Hallo!');
    headerState.setHeaderSubTitle('Melden Sie sich bitte an.');
  }

  ngOnInit(): void {}

  public onSignUpClick(): void {
    // TODO (called on sign up text clicked)
  }

  public async onLogInClick(_email: string, _password: string): Promise<void> {
    this.enableLoading();

    // Now called as mock serice
    const loggedIn = await this.userState.login(_email, _password, true); // true for mock call

    this.handleLoginResult(loggedIn);

    this.disableLoading();
  }

  private handleLoginResult(_loggedIn: boolean): void {
    if (_loggedIn) {
      this.router.navigate(['appointment-dashboard']);
    }

    // TODO: implement logic for different login messages
    // (email doesn't exist or wrong password)
    PasswordValidator.isWrong = true;
    this._passwordFormControl.updateValueAndValidity();
    PasswordValidator.isWrong = false;
  }

  private enableLoading(): void {
    this._isLoading = true;
  }

  private disableLoading(): void {
    this._isLoading = false;
  }

}

/**
 * Email input custom validator.
 */
class EmailValidator {
  static isExist = false;

  static emailNotExist(control: AbstractControl): ValidationErrors | null {
    return EmailValidator.isExist ? { emailNotExist: true } : null;
  }
}
/**
 * Password input custom validator.
 */
class PasswordValidator {
  static isWrong = false;

  static wrongInput(control: AbstractControl): ValidationErrors | null {
    return PasswordValidator.isWrong ? { wrongInput: true } : null;
  }
}
