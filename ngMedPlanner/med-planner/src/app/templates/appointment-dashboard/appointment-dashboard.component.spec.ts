import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDashboardComponent } from './appointment-dashboard.component';

describe('appointmentDashboardComponent', () => {
  let component: AppointmentDashboardComponent;
  let fixture: ComponentFixture<AppointmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppointmentDashboardComponent
      ],
      providers: [
        HttpHandler, HttpClient
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
