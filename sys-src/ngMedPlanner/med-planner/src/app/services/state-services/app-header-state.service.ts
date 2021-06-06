import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppHeaderStateService {

    private _onFilterClickSubject: Subject<DrawerAction>;
    private _onMenuClickSubject: Subject<DrawerAction>;

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

        this._onFilterClickSubject = new Subject<DrawerAction>();
        this._onMenuClickSubject = new Subject<DrawerAction>();
    }

    public setHeaderTitle(value: string): void {
        this._headerTitle = value;
    }

    public setHeaderSubTitle(value: string): void {
        this._headerSubTitle = value;
    }

    public clickOnFilter(action: DrawerAction): void {
        this._onFilterClickSubject.next(action);
    }

    public setOnFilterClickListener(listener: (action: DrawerAction) => void): Subscription {
        return this._onFilterClickSubject.subscribe({
            next: (action: DrawerAction) => {
                listener(action);
            }
        });
    }

    public clickOnMenu(action: DrawerAction): void {
        this._onMenuClickSubject.next(action);
    }

    public setOnMenuClickListener(listener: (action: DrawerAction) => void): Subscription {
        return this._onMenuClickSubject.subscribe({
            next: (action: DrawerAction) => {
                listener(action);
            }
        });
    }

}

export enum DrawerAction {
    OPEN,
    CLOSE
}
