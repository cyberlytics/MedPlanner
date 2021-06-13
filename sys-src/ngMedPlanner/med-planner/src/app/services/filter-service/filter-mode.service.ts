import { Injectable } from '@angular/core';
import { AppStateService, Dashbord } from '../state-services/app-state.service';

@Injectable({
    providedIn: 'root',
})
export class FilterModeService {

    get currentFilterMode(): FilterMode {
        return this._currentFilterMode;
    }
    private _currentFilterMode: FilterMode = FilterMode.APPOINTMENTS;

    constructor(appState: AppStateService) {
        appState.setOnDashboardSwitchListener( (dashboard: Dashbord) => {
            this.setupFilterMode(dashboard);
        });

        this.setupFilterMode(appState.selectedDashboard);
    }

    public switchToAppointments(): void {
        this._currentFilterMode = FilterMode.APPOINTMENTS;
    }

    public switchToDoctors(): void {
        this._currentFilterMode = FilterMode.DOCTORS;
    }

    public setupFilterMode(selectedDashboard: Dashbord): void {
        switch (selectedDashboard) {
            case Dashbord.APPOINTMENTS:
                this.switchToAppointments();
                break;
            case Dashbord.DOCTORS:
                this.switchToDoctors();
                break;
            default:
                break;
        }
    }

}

export enum FilterMode {
    DOCTORS,
    APPOINTMENTS
}
