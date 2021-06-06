import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentCardComponent } from './templates/appointment-dashboard/appointment-card/appointment-card.component';

import { HttpClientModule } from '@angular/common/http';
import { AppointmentDashboardComponent } from './templates/appointment-dashboard/appointment-dashboard.component';
import { PopupDetailViewComponent } from './templates/popup-detail-view/popup-detail-view.component';
import { MaterialModule } from './material/material.module';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppLoginComponent } from './templates/app-login/app-login.component';
import { PriorityComponent } from './templates/appointment-dashboard/appointment-card/priority/priority.component';
import { TagsComponent } from './templates/appointment-dashboard/appointment-card/tags/tags.component';
import { DoctorDashboardComponent } from './templates/doctor-dashboard/doctor-dashboard.component';
import { DoctorCardComponent } from './templates/doctor-dashboard/doctor-card/doctor-card.component';
import { FilterComponent } from './templates/filter/filter.component';
import { FilterAppointmentsComponent } from './templates/filter/filter-appointments/filter-appointments.component';
import { FilterDoctorsComponent } from './templates/filter/filter-doctors/filter-doctors.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentCardComponent,
    AppointmentDashboardComponent,
    PopupDetailViewComponent,
    AppHeaderComponent,
    AppLoginComponent,
    PriorityComponent,
    TagsComponent,
    DoctorDashboardComponent,
    DoctorCardComponent,
    FilterComponent,
    FilterAppointmentsComponent,
    FilterDoctorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
