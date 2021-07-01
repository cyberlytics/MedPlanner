import { Injectable } from '@angular/core';
import { DoctorDataService } from '../../data/doctor-data.service';
import { UserStateService } from '../../user-services/user-state.service';
import { BaseStateService } from '../base-state.service';
import { SpecializationStateService } from '../specialization/specialization-state.service';
import { SurgeryStateService } from '../surgery/surgery-state.service';
import { DoctorModel } from './doctor-model';

@Injectable({
    providedIn: 'root'
})
export class DoctorsDashboardStateService extends BaseStateService<DoctorModel> {

    constructor(
        private doctorsData: DoctorDataService,
        private specializaitonState: SpecializationStateService,
        private surgeryState: SurgeryStateService,
        userState: UserStateService
    ) {
        super(userState);
    }

    protected async initStateData(): Promise<void> {
        const doctorsData = await this.doctorsData.getData();

        for (const doctorData of doctorsData) {
            this.addModel(
                new DoctorModel(
                    {
                        id: doctorData.id,
                        first_name: doctorData.first_name,
                        surname: doctorData.surname,
                        surgery: await this.surgeryState.getModelById(doctorData.surgery_id),
                        specializations: await this.specializaitonState.getSpecializationsByIds(doctorData.specializations)
                    }
                )
            );
        }
    }

    public sortDoctorsAlphabetically(doctors: Array<DoctorModel>): Array<DoctorModel> {
        doctors.sort((a, b) => a.surname.localeCompare(b.surname));
        return doctors;
    }

}
