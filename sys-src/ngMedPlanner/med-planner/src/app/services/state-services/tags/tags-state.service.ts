import { Injectable } from '@angular/core';
import { TagsDataService } from '../../data/tags-data.service';
import { TagModel } from './tag-model';

@Injectable({
    providedIn: 'root'
})
export class TagsStateService {

    private _tags: Array<TagModel> | null = null;

    constructor(private tagsDataService: TagsDataService) {}

    public async getTags(): Promise<Array<TagModel>> {

        if (this._tags === null) {
            await this.initTags();
        }

        return this._tags as Array<TagModel>;
    }

    /**
     * Returns tag by id value or null if not found.
     * @param id Id of tag to find.
     * @returns tag of type TagModel or null.
     */
    public async getTagById(id: number): Promise<TagModel | null> {
        const tags = await this.getTags();

        for (const tag of tags) {
            if (tag.id === id) {
                return tag;
            }
        }

        return null;
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
            const tag = await this.getTagById(id);

            if (tag !== null) {
                tags.push(tag);
            }
        }

        if (tags.length === 0) {
            return undefined;
        }

        return tags;
    }

    private async initTags(): Promise<void> {
        const tagsData = await this.tagsDataService.getData();

        this._tags = new Array<TagModel>();

        for (const tagData of tagsData.tags) {
            this._tags.push(
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
