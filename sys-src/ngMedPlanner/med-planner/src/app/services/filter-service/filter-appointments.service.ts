import { Injectable } from '@angular/core';
import { Priority } from '../state-services/appointments-dashboard/appointment-model';
import { Subject, Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FilterAppointmentsService {

    set isHighPrioritySelected(value: boolean) {
        this._prioritySelection.set(Priority.HIGH, value);
        this.applyFilter();
    }
    get isHighPrioritySelected(): boolean {
        return this._prioritySelection.get(Priority.HIGH) === true;
    }

    set isMediumPrioritySelected(value: boolean) {
        this._prioritySelection.set(Priority.MEDIUM, value);
        this.applyFilter();
    }
    get isMediumPrioritySelected(): boolean {
        return this._prioritySelection.get(Priority.MEDIUM) === true;
    }

    set isLowPrioritySelected(value: boolean) {
        this._prioritySelection.set(Priority.LOW, value);
        this.applyFilter();
    }
    get isLowPrioritySelected(): boolean {
        return this._prioritySelection.get(Priority.LOW) === true;
    }

    private _prioritySelection: Map<Priority, boolean>;
    private _onFilterApplySubject: Subject<void>;

    get isFilterEmpty(): boolean {
        return this._isFilterEmpty;
    }
    private _isFilterEmpty = true;

    constructor() {
        this._prioritySelection = new Map<Priority, boolean>();
        this._onFilterApplySubject = new Subject<void>();
    }

    public applyFilter(): void {
        this.disableEmptyFilter();
        this._onFilterApplySubject.next();
    }

    public setOnFilterApplyListener(listener: () => void): Subscription {
        return this._onFilterApplySubject.subscribe({
            next: () => {
                listener();
            }
        });
    }

    public dropFilter(): void {
        this.enableEmptyFilter();
        this._onFilterApplySubject.next();
    }

    private enableEmptyFilter(): void {
        this._isFilterEmpty = true;

        this.dropPriority();
    }

    private disableEmptyFilter(): void {
        this._isFilterEmpty = false;
    }

    private dropPriority(): void {
        for (const priorityKey of this._prioritySelection.keys()) {
            this._prioritySelection.set(priorityKey, false);
        }
    }

}
