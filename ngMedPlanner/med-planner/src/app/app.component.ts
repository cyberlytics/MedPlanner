import { Component, Inject, Injectable } from '@angular/core';
import { HttpService } from './services/http-service/http-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'med-planner';

  constructor(private httpService: HttpService) {
    this.httpService.getMeetingList();
  }

}
