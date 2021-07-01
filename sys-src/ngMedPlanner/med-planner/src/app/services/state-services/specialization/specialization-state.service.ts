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

    public async getSpecializationsByIds(ids: Array<number> | null): Promise<Array<SpecializationModel | null> | null> {
        if (ids === null) {
            return null;
        }

        const specializations = new Array<SpecializationModel | null>();
        for (const id of ids) {
            specializations.push(await this.getModelById(id));
        }

        return specializations;
    }


    protected async initStateData(): Promise<void> {
        const specializationsData = await this.specializationsData.getData();

        for (const specialization of specializationsData) {
            this.addModel(
                new SpecializationModel(
                    {
                        id: specialization.id,
                        description: specialization.description,
                        color: specialization.color
                    }
                )
            );
        }
    }

}
