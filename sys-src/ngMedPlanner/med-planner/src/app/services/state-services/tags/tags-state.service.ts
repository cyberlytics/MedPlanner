import { Injectable } from '@angular/core';
import { TagsDataService } from '../../data/tags-data.service';
import { UserStateService } from '../../user-services/user-state.service';
import { BaseStateService } from '../base-state.service';
import { TagModel } from './tag-model';

@Injectable({
    providedIn: 'root'
})
export class TagsStateService extends BaseStateService<TagModel> {

    constructor(private tagsDataService: TagsDataService, userState: UserStateService) {
        super(userState);
    }

    /**
     * Returns list of type TagModel by ids or undefined.
     * @param ids List of tag's id to find.
     * @returns List of tags of type TagModel or undefined if there was no tag found.
     */
    public async getTagListByIds(ids: Array<number> | undefined): Promise<Array<TagModel> | undefined> {
        if (ids === undefined) {
            return undefined;
        }

        const tags = new Array<TagModel>();

        for (const id of ids) {
            const tag = await this.getModelById(id);

            if (tag !== null) {
                tags.push(tag);
            }
        }

        if (tags.length === 0) {
            return undefined;
        }

        return tags;
    }

    protected async initStateData(): Promise<void> {
        const tagsData = await this.tagsDataService.getData();

        for (const tagData of tagsData.tags) {
            this.addModel(
                new TagModel(
                    {
                        id: tagData.id,
                        description: tagData.description,
                        color: tagData.color
                    }
                )
            );
        }
    }

}
