import { Injectable } from '@angular/core';
import { Subscription, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppHeaderStateService {

    private _onFilterClickSubject: Subject<void>;
    private _onMenuClickSubject: Subject<void>;

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

        this._onFilterClickSubject = new Subject<void>();
        this._onMenuClickSubject = new Subject<void>();
    }

    public setHeaderTitle(value: string): void {
        this._headerTitle = value;
    }

    public setHeaderSubTitle(value: string): void {
        this._headerSubTitle = value;
    }

    public clickOnFilter(): void {
        this._onFilterClickSubject.next();
    }

    public setOnFilterClickListener(listener: () => void): Subscription {
        return this._onFilterClickSubject.subscribe({
            next: () => {
                listener();
            }
        });
    }

    public clickOnMenu(): void {
        this._onMenuClickSubject.next();
    }

    public setOnMenuClickListener(listener: () => void): Subscription {
        return this._onMenuClickSubject.subscribe({
            next: () => {
                listener();
            }
        });
    }

}
