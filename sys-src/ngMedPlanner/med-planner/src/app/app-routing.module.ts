import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLoginComponent } from './templates/app-login/app-login.component';
import { AppointmentDashboardComponent } from './templates/appointment-dashboard/appointment-dashboard.component';
<<<<<<< HEAD
import { DoctorDashboardComponent}  from './templates/doctor-dashboard/doctor-dashboard.component';
=======
import { AppSignInComponent  } from './templates/app-sign-in/app-sign-in.component';
>>>>>>> master

const routes: Routes = [
  { path: 'login', component: AppLoginComponent },
  { path: 'appointment-dashboard', component: AppointmentDashboardComponent },
<<<<<<< HEAD

  //wird benötigt?
  { path: 'doctor-dashboard', component: DoctorDashboardComponent }
=======
  { path: 'signup', component: AppSignInComponent }
>>>>>>> master
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
