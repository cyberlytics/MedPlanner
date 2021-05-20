import { Injectable } from '@angular/core';
import { DoctorDataService } from '../../data/doctor-data.service';
import { DoctorModel } from './doctor-model';

@Injectable({
    providedIn: 'root'
})
export class DoctorsDashboardStateService {

    private _doctors: Array<DoctorModel> | null = null;

    constructor(private doctorsData: DoctorDataService) {}

    public async getDoctors(): Promise<Array<DoctorModel>> {
        if (this._doctors === null) {
            await this.initDoctors();
        }

        return this._doctors as Array<DoctorModel>;
    }

    public async getDoctorById(_id: number): Promise<DoctorModel | null> {
        const doctors = await this.getDoctors();

        for (const doc of doctors) {
            if (doc.id === _id) {
                return doc;
            }
        }

        return null;
    }

    private async initDoctors(): Promise<void> {
        const doctorsData = await this.doctorsData.getData();

        this._doctors = new Array<DoctorModel>();

        for (const doctorData of doctorsData.doctors) {
            this._doctors.push(
                new DoctorModel(
                    {
                        id: doctorData.id,
                        first_name: doctorData.first_name,
                        surname: doctorData.surname,
                        surgery_id: doctorData.surgery_id,
                        specialization_id: doctorData.specialization_id
                    }
                )
            );
        }
    }

}
