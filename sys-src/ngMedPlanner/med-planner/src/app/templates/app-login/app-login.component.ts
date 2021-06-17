import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppHeaderStateService } from 'src/app/services/state-services/app-header-state.service';
import { LoginResult } from 'src/app/services/user-services/login.service';
import { UserStateService } from 'src/app/services/user-services/user-state.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss']
})
export class AppLoginComponent implements OnInit {

  private readonly EMAIL_REQUIRED_MESSAGE = 'EMail-Adresse erforderlich!';
  private readonly EMAIL_WRONG_MESSAGE = 'Gültige EMail-Adresse erforderlich!';
  private readonly EMAIL_DOESNT_EXIST_MESSAGE = 'Es existiert kein Benutzer mit dieser EMail-Adresse';

  private readonly PASSWORD_REQUIRED_MESSAGE = 'Passwort erforderlich!';
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
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this._emailFormControl = new FormControl(
      '',
      [Validators.required, Validators.email, EmailValidator.emailNotExist]
    );
    this._emailFormControl.setValue(this.userState.userEmail);

    this._passwordFormControl = new FormControl(
      '',
      [Validators.required, PasswordValidator.wrongInput]
    );

    this._hidePassword = true;
    this._isLoading = false;

    headerState.setHeaderTitle('Hallo!');
    headerState.setHeaderSubTitle('Melden Sie sich bitte ein.');
  }

  ngOnInit(): void {}

  public onSignUpClick(): void {
    // TODO (called on sign up text clicked)
    this.router.navigate(['signup']);

  }

  public async onLogInClick(_email: string, _password: string): Promise<void> {
    this.enableLoading();

    const loggedIn = await this.userState.login(_email, _password);

    this.handleLoginResult(loggedIn);

    this.disableLoading();
  }

  private handleLoginResult(_loginResult: LoginResult): void {
    switch (_loginResult) {
      case LoginResult.LOGIN_SUCCESFULL: {
        this.handleLoginSuccesfull();
        break;
      }
      case LoginResult.USER_DOES_NOT_EXIST: {
        this.handleUserDoesNotExistError();
        break;
      }
      case LoginResult.PASSWORD_IS_WRONG: {
        this.handleWrongPasswordError();
        break;
      }
      case LoginResult.SERVER_ERROR: {
        this.handleServerError();
        break;
      }
      case LoginResult.UNKNOWN_ERROR: {
        this.handleUnknownError();
        break;
      }
    }
  }

  private handleLoginSuccesfull(): void {
    this.router.navigate(['appointment-dashboard']);
  }

  private handleUserDoesNotExistError(): void {
    EmailValidator.enableError();
    this._emailFormControl.updateValueAndValidity();
    EmailValidator.disableError();
  }

  private handleWrongPasswordError(): void {
    PasswordValidator.enableError();
    this._passwordFormControl.updateValueAndValidity();
    PasswordValidator.disableError();
  }

  private handleServerError(): void {
    this.snackBar.open('Server Error!', 'Ok', {
      duration: 4000,
      verticalPosition: 'bottom',
      panelClass: ['secondary-background']
    });
  }

  private handleUnknownError(): void {
    this.snackBar.open('Unknown Error!', 'Ok', {
      duration: 4000,
      verticalPosition: 'bottom',
      panelClass: ['secondary-background']
    });
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
  private static isNotExist = false;

  static enableError(): void {
    this.isNotExist = true;
  }

  static disableError(): void {
    this.isNotExist = false;
  }

  static emailNotExist(control: AbstractControl): ValidationErrors | null {
    return EmailValidator.isNotExist ? { emailNotExist: true } : null;
  }
}
/**
 * Password input custom validator.
 */
class PasswordValidator {
  private static isWrong = false;

  static enableError(): void {
    this.isWrong = true;
  }

  static disableError(): void {
    this.isWrong = false;
  }

  static wrongInput(control: AbstractControl): ValidationErrors | null {
    return PasswordValidator.isWrong ? { wrongInput: true } : null;
  }
}
