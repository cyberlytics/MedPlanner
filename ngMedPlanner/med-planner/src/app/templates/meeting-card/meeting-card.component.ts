import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-card-component',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.scss']
})
export class MeetingCardComponent implements OnInit {

  @Input() set name(value: string | undefined) {
    this.namePrivate = value;
  }

  get name(): string | undefined {
    return this.namePrivate;
  }

  private namePrivate: string | undefined;

  constructor() {
    this.namePrivate = 'Name';
  }

  ngOnInit(): void {
  }

}
