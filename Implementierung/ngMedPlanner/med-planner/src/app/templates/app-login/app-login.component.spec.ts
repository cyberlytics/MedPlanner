import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AppLoginComponent } from './app-login.component';

describe('AppLoginComponent', () => {
  let component: AppLoginComponent;
  let fixture: ComponentFixture<AppLoginComponent>;

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
});
