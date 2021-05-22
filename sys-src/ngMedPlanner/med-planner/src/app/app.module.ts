import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentCardComponent } from './templates/appointment-card/appointment-card.component';

import { HttpClientModule } from '@angular/common/http';
import { AppointmentDashboardComponent } from './templates/appointment-dashboard/appointment-dashboard.component';
import { PopupDetailViewComponent } from './templates/popup-detail-view/popup-detail-view.component';
import { MaterialModule } from './material/material.module';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppLoginComponent } from './templates/app-login/app-login.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentCardComponent,
    AppointmentDashboardComponent,
    PopupDetailViewComponent,
    AppHeaderComponent,
    AppLoginComponent
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
