import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentCardComponent } from './templates/appointment-card/appointment-card.component';

import { HttpClientModule } from '@angular/common/http';
import { AppointmentDashboardComponent } from './templates/appointment-dashboard/appointment-dashboard.component';
import { PopupDetailViewComponent } from './templates/popup-detail-view/popup-detail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AppointmentCardComponent,
    AppointmentDashboardComponent,
    PopupDetailViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
