import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, Form, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';



@Component({
  selector: 'app-sign-in-component',
  templateUrl: './app-sign-in.component.html',
  styleUrls: ['./app-sign-in.component.scss']
})
export class AppSignInComponent implements OnInit {

  
  private readonly EMAIL_REQUIRED_MESSAGE = 'Eine Email ist erforderlich!';
  private readonly EMAIL_WRONG_MESSAGE = 'Eine gültige Email erforderlich!';
  

  private readonly PASSWORD_REQUIRED_MESSAGE = 'Ein Passwort erforderlich!';
  private readonly DIFFERENT_PASSWORDS_MESSAGE = 'Die Passwörter stimmen nicht überein!';


  get emailErrorMessage(): string {
    if (this._registerEmailFormControl.hasError('required')) {
      return this.EMAIL_REQUIRED_MESSAGE;
    }

    if (this._registerEmailFormControl.hasError('email')) {
      return this.EMAIL_WRONG_MESSAGE;
    }
    return '';
  }


  get passwordErrorMessage(): string {
    if (this._registerPasswordFormControl.hasError('required')) {
      return this.PASSWORD_REQUIRED_MESSAGE;
    }

    if (this._registerPasswordFormControl.hasError('differentPasswords')) {
      return this.DIFFERENT_PASSWORDS_MESSAGE;
    }

    if(this._confirmPasswordFormControl.hasError('required')){
      return this.PASSWORD_REQUIRED_MESSAGE;
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


  constructor(
    
    private router: Router,
    
  ){

    this._registerEmailFormControl = new FormControl(
      '',
      [Validators.required, Validators.email]
    );


    this._registerPasswordFormControl = new FormControl(
      '',
      [Validators.required, RegPasswordValidator.differentPasswords]
    );
    

    this._confirmPasswordFormControl = new FormControl(
      '',
      [Validators.required, RegPasswordValidator.differentPasswords] 
    );

  } 

  ngOnInit(): void {
  }

  //Verknüpfung mit Log-in-Componente
  public onLogInClick(): void {
    //console.log("zum login");
    this.router.navigate(['login']);
  }

  public async onSignUpClick(_email: string, _password: string): Promise<void>{
    this.handleDifferentPassword();
  }  



  private handleDifferentPassword(): void {

    if(this._confirmPasswordFormControl.value != this._registerPasswordFormControl.value) {
      RegPasswordValidator.enableError();
      this._confirmPasswordFormControl.updateValueAndValidity();
      RegPasswordValidator.disableError();
    }

  }

  //wenn Passwort und E-Mail richtig, dann zum Login
  private handleSignUpSuccesfull(): void {
    this.router.navigate(['login']);
  }

  
}



/**
 * Password input custom validator.
 */

//LOGIK FÜR VERGLEICH DER FELDER FEHLT
 class RegPasswordValidator {
  private static isWrong = false;

  static enableError(): void {
    this.isWrong = true;
  }

  static disableError(): void {
    this.isWrong = false;
  }

  static differentPasswords(control: AbstractControl): ValidationErrors | null {
    return RegPasswordValidator.isWrong ? { differentPasswords: true } : null;
  }
}