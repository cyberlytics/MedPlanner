import { Injectable } from '@angular/core';
import { SpecializationsDataService } from '../../data/specializations-data.service';
import { UserStateService } from '../../user-services/user-state.service';
import { BaseStateService } from '../base-state.service';
import { SpecializationModel } from './specialization-model';

@Injectable({
    providedIn: 'root'
})
export class SpecializationStateService extends BaseStateService<SpecializationModel> {

    constructor(
        private specializationsData: SpecializationsDataService,
        userState: UserStateService
    ) {
        super(userState);
    }

    protected async initStateData(): Promise<void> {
        const specializationsData = await this.specializationsData.getData();

        for (const specialization of specializationsData.specializations) {
            this.addData(
                new SpecializationModel(
                    {
                        id: specialization.id,
                        description: specialization.description
                    }
                )
            );
        }
    }

}
