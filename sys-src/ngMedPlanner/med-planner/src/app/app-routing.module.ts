import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLoginComponent } from './templates/app-login/app-login.component';
import { AppointmentDashboardComponent } from './templates/appointment-dashboard/appointment-dashboard.component';
import { DoctorDashboardComponent}  from './templates/doctor-dashboard/doctor-dashboard.component';

const routes: Routes = [
  { path: 'login', component: AppLoginComponent },
  { path: 'appointment-dashboard', component: AppointmentDashboardComponent },

  //wird benötigt?
  { path: 'doctor-dashboard', component: DoctorDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
