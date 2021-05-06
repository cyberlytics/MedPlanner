import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MeetingCardComponent } from './templates/meeting-card/meeting-card.component';

import { HttpClientModule } from '@angular/common/http';
import { MeetingDashboardComponent } from './templates/meeting-dashboard/meeting-dashboard.component';
import { PopupDetailViewComponent } from './templates/popup-detail-view/popup-detail-view.component';

@NgModule({
  declarations: [
    AppComponent,
    MeetingCardComponent,
    MeetingDashboardComponent,
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
