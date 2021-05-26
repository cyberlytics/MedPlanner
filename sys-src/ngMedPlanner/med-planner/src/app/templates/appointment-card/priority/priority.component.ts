import { Component, Input, OnInit } from '@angular/core';
import { MaterialModule } from 'src/app/material/material.module';
import { Priority } from 'src/app/services/state-services/appointments-dashboard/appointment-model';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent implements OnInit {

  @Input() set priority(value: Priority | undefined) {
    this._priority = value;
  }
  private _priority: Priority | undefined;

  get priorityIcon(): string {

    switch (this._priority) {
      case Priority.HIGH: {
        return MaterialModule.ICON_PRI_HIGH;
      }
      case Priority.MEDIUM: {
        return MaterialModule.ICON_PRI_MEDIUM;
      }
      case Priority.LOW: {
        return MaterialModule.ICON_PRI_LOW;
      }
      default: {
        return MaterialModule.ICON_PRI_MEDIUM;
      }
    }

  }


  get priorityText(): string {

    switch (this._priority) {
      case Priority.HIGH: {
        return 'Hoch';
      }
      case Priority.MEDIUM: {
        return 'Mittel';
      }
      case Priority.LOW: {
        return 'Niedrig';
      }
      default: {
        return 'Mittel';
      }
    }

  }

  constructor() { }

  ngOnInit(): void {}

}
