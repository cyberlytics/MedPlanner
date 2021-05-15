import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { UserStateService } from './services/user-services/user-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('routerBlockDiv') routerBlockDiv: ElementRef;

  title = 'med-planner';

  constructor(private userState: UserStateService) {
    this.routerBlockDiv = new ElementRef(null);
  }


  ngAfterViewInit(): void {
    this.userState.checkLogin();
  }

  public onHeaderHeightInit(_headerHeight: number): void {
    try {
      this.routerBlockDiv.nativeElement.style.marginTop = _headerHeight + 'px';
    } catch (e) {
      console.error(e);
    }
  }



}
