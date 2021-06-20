import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, Form, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {SignUpService} from 'src/app/services/user-services/signup.service';
import { RegisterResult } from 'src/app/services/user-services/signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in-component',
  templateUrl: './app-sign-in.component.html',
  styleUrls: ['./app-sign-in.component.scss']
})
export class AppSignInComponent implements OnInit { 

  private readonly EMAIL_REQUIRED_MESSAGE = 'EMail-Adresse erforderlich!';
  private readonly EMAIL_WRONG_MESSAGE = 'Gültige Email-Adresse erforderlich!';
  private readonly EMAIL_ALREADY_EXIST_MESSAGE = 'Diese Email existiert bereits!';

  private readonly PASSWORD_REQUIRED_MESSAGE = 'Passwort ist erforderlich!';
  private readonly PASSWORD_NOT_MATCHING_MESSAGE = 'Passwort zu unsicher!';
  private readonly DIFFERENT_PASSWORDS_MESSAGE = 'Die Passwörter stimmen nicht überein!';

  get emailErrorMessage(): string {
    if (this._registerEmailFormControl.hasError('required')) {
      return this.EMAIL_REQUIRED_MESSAGE;
    }

    if (this._registerEmailFormControl.hasError('email')) {
      return this.EMAIL_WRONG_MESSAGE;
    }
    if (this._registerEmailFormControl.hasError('emailAlreadyExist')) {
      return this.EMAIL_ALREADY_EXIST_MESSAGE;
    }

    return '';
  }


  get passwordErrorMessage(): string {
    if (this._registerPasswordFormControl.hasError('required')) {
      return this.PASSWORD_REQUIRED_MESSAGE;
    }

    if (this._registerPasswordFormControl.hasError('passwordStrengthCheck')) {
      return this.PASSWORD_NOT_MATCHING_MESSAGE;
    }
    if (this._registerPasswordFormControl.hasError('differentPasswords')) {
      return this.DIFFERENT_PASSWORDS_MESSAGE;
    }
    if (this._confirmPasswordFormControl.hasError('differentPasswords')) {
      return this.DIFFERENT_PASSWORDS_MESSAGE;
    }

    return '';
  }


  get registerEmailFormControl(): FormControl {
    return this._registerEmailFormControl;
  }
  private _registerEmailFormControl: FormControl;



  get registerPasswordFormControl(): FormControl {
    return this._registerPasswordFormControl;
  }
  private _registerPasswordFormControl: FormControl;


  get confirmPasswordFormControl(): FormControl{
    return this._confirmPasswordFormControl;
  }
  private _confirmPasswordFormControl: FormControl;


  set hidePassword(value: boolean) {
    this._hidePassword = value;
  }
  get hidePassword(): boolean {
    return this._hidePassword;
  }
  private _hidePassword: boolean;

  constructor(

    private router: Router,
    private snackBar: MatSnackBar,
    private signupState: SignUpService
  ){

    this._registerEmailFormControl = new FormControl(
      '',
      [Validators.required, Validators.email, EmailValidator.emailAlreadyExist]
    );


    this._registerPasswordFormControl = new FormControl(
      '',
      [Validators.required, RegPasswordValidator.differentPasswords, RegPasswordValidator.passwordStrengthCheck]
    );


    this._confirmPasswordFormControl = new FormControl(
      {value: '', disabled: true},
      [Validators.required, RegPasswordValidator.differentPasswords]
    );

    this._hidePassword = true;
  }

  ngOnInit(): void {
  }

  // Connection to Log-in-Component
  public onLogInClick(): void {

    this.router.navigate(['login']);
  }

  public async onSignUpClick(_email: string, _password: string): Promise<void>{
    // only add user if passwords match
    this.handleDifferentPassword();
    if (this._confirmPasswordFormControl.value == this.registerPasswordFormControl.value) {
      const signedUp = await this.signupState.signup(_email, _password);

      this.handleLoginResult(signedUp);
    }
  }

  /**
   * Method to check user input password with RegEx
   */
  public handlePasswordStrength(): void {
    const passwordRegex = new RegExp('^(?=.*[a-zöäüß])(?=.*[A-ZÖÄÜ])(?=.*[0-9])(?=.*[\W\.\_])(?=.{8,})');

    if (passwordRegex.test(this._registerPasswordFormControl.value) == false) {
      RegPasswordValidator.strengthCheckInValid();
      this._registerPasswordFormControl.updateValueAndValidity();
      RegPasswordValidator.strengthCheckValid();
      this._confirmPasswordFormControl.disable();
    }
    else{
      // enable confirm password input only if regex matches
      this._confirmPasswordFormControl.enable();
    }
  }


  // function called by "(blur)" in html-template
  public handleDifferentPassword(): void {
    if (this._confirmPasswordFormControl.value != this._registerPasswordFormControl.value) {
      RegPasswordValidator.enableError();
      this._confirmPasswordFormControl.updateValueAndValidity();
      RegPasswordValidator.disableError();
    }

  }


  private handleSignUpSuccesfull(): void {
    this.router.navigate(['login']);
  }


  private handleLoginResult(_signupResult: RegisterResult): void {
    switch (_signupResult) {
      case RegisterResult.SIGNUP_SUCCESFULL: {
        this.handleSignUpSuccesfull();
        break;
      }
      case RegisterResult.EMAIL_ALREADY_EXIST: {
        this.handleEmailAlreadyExist();
        break;
      }
      case RegisterResult.SERVER_ERROR: {
        this.handleServerError();
        break;
      }
      case RegisterResult.UNKNOWN_ERROR: {
        this.handleUnknownError();
        break;
      }
    }
  }

  private handleEmailAlreadyExist(): void {
    EmailValidator.enableError();
    this._registerEmailFormControl.updateValueAndValidity();
    EmailValidator.disableError();
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
}


/**
 * Email input custom validator.
 */
 class EmailValidator {
  private static isAlreadyExist = false;

  static enableError(): void {
    this.isAlreadyExist = true;
  }

  static disableError(): void {
    this.isAlreadyExist = false;
  }

  static emailAlreadyExist(control: AbstractControl): ValidationErrors | null {
    return EmailValidator.isAlreadyExist ? { emailAlreadyExist: true } : null;
  }
}

/**
 * Password input custom validator.
 */
 class RegPasswordValidator {
  private static isWrong = false;
  private static isWeak = false;

  static enableError(): void {
    this.isWrong = true;
  }

  static disableError(): void {
    this.isWrong = false;
  }

  /**
   * Method is called if password is too weak
   */
  static strengthCheckInValid(): void {
    this.isWeak = true;
  }

  /**
   * Method is called if password matches RegEx
   */
  static strengthCheckValid(): void {
    this.isWeak = false;
  }

  static differentPasswords(control: AbstractControl): ValidationErrors | null {
    return RegPasswordValidator.isWrong ? { differentPasswords: true } : null;
  }

  static passwordStrengthCheck(control: AbstractControl): ValidationErrors | null {
    return RegPasswordValidator.isWeak ? { passwordStrengthCheck: true } : null;
  }
}
