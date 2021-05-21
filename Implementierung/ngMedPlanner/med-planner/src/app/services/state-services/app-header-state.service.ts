import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppHeaderStateService {

    get headerTitle(): string {
        return this._headerTitle;
    }
    private _headerTitle: string;

    get headerSubTitle(): string {
        return this._headerSubTitle;
    }
    private _headerSubTitle: string;

    constructor() {
        this._headerTitle = '<< none >>';
        this._headerSubTitle = '<< none >>';
    }

    public setHeaderTitle(value: string): void {
        this._headerTitle = value;
    }

    public setHeaderSubTitle(value: string): void {
        this._headerSubTitle = value;
    }

}
