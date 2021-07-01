import { Injectable } from '@angular/core';
import { TagData } from '../data-interfaces/data-interfaces';
import { HttpService } from '../http-service/http.service';
import { UserStateService } from '../user-services/user-state.service';
import { DataServiceBasic } from './data-basic.service';

@Injectable({
    providedIn: 'root',
})
export class TagsDataService extends DataServiceBasic<Array<TagData>> {

    constructor(httpService: HttpService, userState: UserStateService) {
        super(
            httpService,
            {
                requestURL: HttpService.TAG_LIST
            },
            userState
        );
    }

}

interface TagsData {
    tags: Array<TagData>;
}
