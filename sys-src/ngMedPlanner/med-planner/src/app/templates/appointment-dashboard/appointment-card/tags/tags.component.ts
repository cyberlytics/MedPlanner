import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TagModel } from 'src/app/services/state-services/tags/tag-model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  @Input() set tags(value: Array<TagModel> | undefined) {
    console.log('tags', value);
    this._tags = value;

    this.changeDet.detectChanges();
  }
  get tags(): Array<TagModel> | undefined {
    return this._tags;
  }
  private _tags: Array<TagModel> | undefined;

  constructor(private changeDet: ChangeDetectorRef) { }

  ngOnInit(): void {}

}
