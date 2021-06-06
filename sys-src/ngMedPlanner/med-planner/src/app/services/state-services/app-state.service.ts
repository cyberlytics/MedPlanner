import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {

    get selectedDashboard(): Dashbord {
        return this._selectedDashboard;
    }
    private _selectedDashboard: Dashbord;

    private _subjectOnDashboardSwitch: Subject<Dashbord>;

    constructor() {
        this._selectedDashboard = Dashbord.APPOINTMENTS;
        this._subjectOnDashboardSwitch = new Subject<Dashbord>();
    }

    /**
     * Switches between Appointments/Doctors dashboards
     */
    public switchDashboards(): void {
        switch (this._selectedDashboard) {
            case Dashbord.APPOINTMENTS:
                this.selectDoctorsDashboard();
                break;
            case Dashbord.DOCTORS:
                this.selectAppointmentsDashboard();
                break;
            default:
                break;
        }
    }

    public selectAppointmentsDashboard(): void {
        this._selectedDashboard = Dashbord.APPOINTMENTS;
        this.triggerDashboardSubject();
    }

    public selectDoctorsDashboard(): void {
        this._selectedDashboard = Dashbord.DOCTORS;
        this.triggerDashboardSubject();
    }

    public setOnDashboardSwitchListener(listener: (dashboard: Dashbord) => void): Subscription {
        return this._subjectOnDashboardSwitch.subscribe({
            next: (dashboard) => {
                listener(dashboard);
            }
        });
    }

    private triggerDashboardSubject(): void {
        this._subjectOnDashboardSwitch.next(this._selectedDashboard);
    }

}

export enum Dashbord {
    APPOINTMENTS,
    DOCTORS
}
