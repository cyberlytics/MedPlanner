import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentCardComponent } from './templates/appointment-dashboard/appointment-card/appointment-card.component';

import { HttpClientModule } from '@angular/common/http';
import { AppointmentDashboardComponent } from './templates/appointment-dashboard/appointment-dashboard.component';
import { AppointmentDetailViewComponent } from './templates/appointment-dashboard/appointment-card/dialogs/appointment-detail-view/appointment-detail-view.component';
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
import { FilterPriorityComponent } from './templates/filter/filter-appointments/filter-priority/filter-priority.component';
import { FilterSpecializationsComponent } from './templates/filter/filter-appointments/filter-specializations/filter-specializations.component';
import { FilterCitiesComponent } from './templates/filter/filter-appointments/filter-cities/filter-cities.component';
import { FilterPeriodComponent } from './templates/filter/filter-appointments/filter-period/filter-period.component';
import { FilterTagsComponent } from './templates/filter/filter-appointments/filter-tags/filter-tags.component';
import { AppointmentEditViewComponent } from './templates/appointment-dashboard/appointment-card/dialogs/appointment-edit-view/appointment-edit-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentCardComponent,
    AppointmentDashboardComponent,
    AppointmentDetailViewComponent,
    AppHeaderComponent,
    AppLoginComponent,
    PriorityComponent,
    TagsComponent,
    DoctorDashboardComponent,
    DoctorCardComponent,
    FilterComponent,
    FilterAppointmentsComponent,
    FilterDoctorsComponent,
    FilterPriorityComponent,
    FilterSpecializationsComponent,
    FilterCitiesComponent,
    FilterPeriodComponent,
    FilterTagsComponent,
    AppointmentEditViewComponent
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
