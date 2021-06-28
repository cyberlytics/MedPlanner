import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginResult } from 'src/app/services/user-services/login.service';
import { UserStateService } from 'src/app/services/user-services/user-state.service';

import { AppLoginComponent } from './app-login.component';

describe('AppLoginComponent', () => {
  let component: AppLoginComponent;
  let fixture: ComponentFixture<AppLoginComponent>;
  let userState: any;

  const userStateService = jasmine.createSpyObj('UserStateService', {
    userEmail: () => {
      return '';
    }
  });

  const httpService = jasmine.createSpyObj('HttpService', {
    getData: () => {
      return false;
    },
    postMessage: () => {
      return false;
    },
    postUnauthorizedMessage: () => {
      return false;
    },
    delete: () => {
      return false;
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppLoginComponent
      ],
      providers: [
        { provide: MatSnackBar, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('email form should be invalid', () => {
    component.emailFormControl.setValue('someinvalidemailadress');
    expect(component.emailFormControl.valid).toBeFalsy();
  });

  it('email form should be valid', () => {
    component.emailFormControl.setValue('some@valid.email');
    expect(component.emailFormControl.valid).toBeTruthy();
  });

  it('password form should be invalid', () => {
    component.passwordFormControl.setValue('');
    expect(component.passwordFormControl.valid).toBeFalsy();
  });

  it('password form should be valid', () => {
    component.passwordFormControl.setValue('somepassword');
    expect(component.passwordFormControl.valid).toBeTruthy();
  });

  it('sign-in button should be disabled', () => {
    const element = fixture.nativeElement.querySelector('#sing-in-button');
    expect(element.disabled).toBeTruthy();
  });

  it('sign-in button should be enabled', () => {
    component.emailFormControl.setValue('some@valid.email');
    component.passwordFormControl.setValue('somepassword');
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('#sing-in-button');
    expect(element.disabled).toBeFalsy();
  });

  it('password form should be invalid, cause invalid login', () => {
    // spy user state service
    userState = jasmine.createSpyObj(
      'UserStateService',
      {
        login: () => {
          return LoginResult.PASSWORD_IS_WRONG;
        }
      }
    );

    component.onLogInClick('email@email.com', 'password');

    expect(component.passwordFormControl.valid).toBeFalsy();
  });

  it('email form should be invalid, cause invalid login', () => {
    // spy user state service
    userState = jasmine.createSpyObj(
      'UserStateService',
      {
        login: () => {
          return LoginResult.USER_DOES_NOT_EXIST;
        }
      }
    );

    component.onLogInClick('email@email.com', 'password');

    expect(component.emailFormControl.valid).toBeFalsy();
  });

  it('email and password form should be valid: loggin is succesfull', () => {
    // spy user state service
    userState = jasmine.createSpyObj(
      'UserStateService',
      {
        login: () => {
          return LoginResult.LOGIN_SUCCESFULL;
        }
      }
    );

    const email = 'email@email.com';
    const password = 'password';
    component.emailFormControl.setValue(email);
    component.passwordFormControl.setValue(password);

    component.onLogInClick(email, password);

    expect(component.emailFormControl.valid).toBeTruthy();
    expect(component.passwordFormControl.valid).toBeTruthy();
  });

});
