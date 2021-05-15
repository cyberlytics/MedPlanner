import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppLoginComponent } from './app-login.component';

describe('AppLoginComponent', () => {
  let component: AppLoginComponent;
  let fixture: ComponentFixture<AppLoginComponent>;
  let userState: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppLoginComponent
      ],
      providers: [
        HttpClient,
        HttpHandler
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
    fixture.detectChanges();
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
          return false;
        }
      }
    );

    expect(component.passwordFormControl.valid).toBeFalsy();
  });

});
