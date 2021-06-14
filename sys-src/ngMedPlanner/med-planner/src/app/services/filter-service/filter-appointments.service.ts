import { Injectable } from '@angular/core';
import { Priority } from '../state-services/appointments-dashboard/appointment-model';
import { Subject, Subscription } from 'rxjs';
import { SpecializationModel } from '../state-services/specialization/specialization-model';
import { CityModel } from '../state-services/surgery/city-model';
import { TagModel } from '../state-services/tags/tag-model';

@Injectable({
    providedIn: 'root',
})
export class FilterAppointmentsService {

    /** Priority */
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

    /** Specialization */
    get specializationSelection(): ReadonlyArray<SpecializationModel> {
        return this._specializationSelection.selection;
    }
    private _specializationSelection: FilterSelection<SpecializationModel>;

    /** City */
    get citySelection(): ReadonlyArray<CityModel> {
        return this._citySelection.selection;
    }
    private _citySelection: FilterSelection<CityModel>;

    /** Tags */
    get tagsSelection(): ReadonlyArray<TagModel> {
        return this._tagsSelection.selection;
    }
    private _tagsSelection: FilterSelection<TagModel>;

    /** Date range */
    get startDate(): Date | null {
        return this._startDate;
    }
    private _startDate: Date | null = null;

    get endDate(): Date | null {
        return this._endDate;
    }
    private _endDate: Date | null = null;


    private _onFilterApplySubject: Subject<void>;

    get isFilterEmpty(): boolean {
        return this._isFilterEmpty;
    }
    private _isFilterEmpty = true;

    constructor() {
        this._prioritySelection = new Map<Priority, boolean>();

        this._specializationSelection = new FilterSelection( () => { this.applyFilter(); } );
        this._citySelection = new FilterSelection( () => { this.applyFilter(); } );
        this._tagsSelection = new FilterSelection( () => { this.applyFilter(); } );

        this._onFilterApplySubject = new Subject<void>();
    }

    /** General functions */
    private enableEmptyFilter(): void {
        this._isFilterEmpty = true;

        this.dropPriority();
        this.dropSpecializations();
        this.dropCites();
        this.dropTags();
        this.dropDateRange();
    }

    private disableEmptyFilter(): void {
        this._isFilterEmpty = false;
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

    /** Priority functions */
    private dropPriority(): void {
        for (const priorityKey of this._prioritySelection.keys()) {
            this._prioritySelection.set(priorityKey, false);
        }
    }

    /** Specialization functions */
    public selectSpecialization(specialization: SpecializationModel): void {
        this._specializationSelection.select(specialization);
    }

    public unselectSpecialization(specialization: SpecializationModel): void {
        this._specializationSelection.unselect(specialization);
    }

    public isSpecializationSelected(specialization: SpecializationModel): boolean {
        return this._specializationSelection.isSelected(specialization);
    }

    private dropSpecializations(): void {
        this._specializationSelection.drop();
    }

    /** Cites functions */
    public selectCity(city: CityModel): void {
        this._citySelection.select(city);
    }

    public unselectCity(city: CityModel): void {
        this._citySelection.unselect(city);
    }

    public isCitySelected(city: CityModel): boolean {
        return this._citySelection.isSelected(city);
    }

    private dropCites(): void {
        this._citySelection.drop();
    }

    /** Tags functions */
    public selectTag(tag: TagModel): void {
        this._tagsSelection.select(tag);
    }

    public unselectTag(tag: TagModel): void {
        this._tagsSelection.unselect(tag);
    }

    public isTagSelected(tag: TagModel): boolean {
        return this._tagsSelection.isSelected(tag);
    }

    private dropTags(): void {
        this._tagsSelection.drop();
    }

    /** Date range functions */
    public selectStartDate(date: Date): void {
        this._startDate = date;

        if (!this.isEndDateSelected()) {
            return;
        }

        this.applyFilter();
    }
    public unselectStartDate(): void {
        this._startDate = null;

        this.applyFilter();
    }
    public isStartDateSelected(): boolean {
        return this._startDate !== null;
    }

    public selectEndDate(date: Date): void {
        this._endDate = date;

        if (!this.isStartDateSelected()) {
            return;
        }

        this.applyFilter();
    }
    public unselectEndDate(): void {
        this._endDate = null;

        this.applyFilter();
    }
    public isEndDateSelected(): boolean {
        return this._endDate !== null;
    }

    public isDateRangeSelected(): boolean {
        return this.isStartDateSelected() && this.isEndDateSelected();
    }

    private dropDateRange(): void {
        this._startDate = null;
        this._endDate = null;
    }

}

class FilterSelection<T> {

    get selection(): ReadonlyArray<T> {
        return this._selection;
    }
    private _selection: Array<T>;

    constructor(private applyFilter: () => void) {
        this._selection = new Array<T>();
    }

    public select(model: T): void {
        if (this.isSelected(model)) {
            return;
        }

        this._selection.push(model);

        this.applyFilter();
    }

    public unselect(model: T): void {
        if (!this.isSelected(model)) {
            return;
        }

        const index = this._selection.indexOf(model);
        this._selection.splice(index, 1);

        this.applyFilter();
    }

    public isSelected(model: T): boolean {
        return this._selection.includes(model);
    }

    public drop(): void {
        this._selection.length = 0;
    }

}

