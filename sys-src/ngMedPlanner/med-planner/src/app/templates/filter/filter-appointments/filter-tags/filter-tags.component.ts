import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TagModel } from 'src/app/services/state-services/tags/tag-model';
import { Observable } from 'rxjs';
import {FormControl} from '@angular/forms';
import { FilterAppointmentsService } from 'src/app/services/filter-service/filter-appointments.service';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { TagsStateService } from 'src/app/services/state-services/tags/tags-state.service';

@Component({
  selector: 'app-filter-tags',
  templateUrl: './filter-tags.component.html',
  styleUrls: ['./filter-tags.component.scss']
})
export class FilterTagsComponent implements OnInit {

  @ViewChild('inputTag') inputTag: ElementRef | undefined;

  get filteredTagsList(): Observable<Array<TagModel>> {
    return this._filteredTagsList;
  }
  private _filteredTagsList: Observable<Array<TagModel>>;
  private _tagsList: Array<TagModel>;

  get selectedTags(): ReadonlyArray<TagModel> {
    return this.filterAppointment.tagsSelection;
  }
  get tagControl(): FormControl {
    return this._tagControl;
  }
  private _tagControl: FormControl;

  constructor(
    private filterAppointment: FilterAppointmentsService,
    private tagsState: TagsStateService
  ) {
    this._tagsList = new Array<TagModel>();
    this._filteredTagsList = new Observable<Array<TagModel>>();
    this._tagControl = new FormControl();
  }

  ngOnInit(): void {
    this.loadTagsList();
    this._filteredTagsList = this._tagControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterTags(value))
    );
  }

  private async loadTagsList(): Promise<void> {
    this._tagsList = await this.tagsState.getStateData();
  }

  private filterTags(value: string): Array<TagModel> {
    try {
      const filterValue = value.toLocaleLowerCase();
      return this._tagsList.filter(
        tag =>
          tag.description.toLocaleLowerCase().indexOf(filterValue) === 0 &&
          !this.filterAppointment.isTagSelected(tag)
      );
    } catch {
      return this._tagsList;
    }
  }

  public selectedTagFilter(event: MatAutocompleteSelectedEvent): void {
    this.filterAppointment.selectTag(event.option.value);

    this._tagControl.setValue(null);
    this._tagControl.updateValueAndValidity({ onlySelf: true, emitEvent: true });

    if (this.inputTag === undefined) {
      return;
    }
    this.inputTag.nativeElement.value = '';
  }

  public removeTag(specialization: TagModel): void {
    this.filterAppointment.unselectTag(specialization);
  }

}
