import { Injectable } from '@angular/core';
import { TagData } from '../data-interfaces/data-interfaces';
import { HttpService } from '../http-service/http.service';
import { DataServiceBasic } from './data-basic.service';

@Injectable({
    providedIn: 'root',
})
export class TagsDataService extends DataServiceBasic<TagsData> {

    constructor(httpService: HttpService) {
        super(
            httpService,
            {
                requestURL: HttpService.TAGS_URL
            }
        );
    }

}

interface TagsData {
    tags: Array<TagData>;
}
