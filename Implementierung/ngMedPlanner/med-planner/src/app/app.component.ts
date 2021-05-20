import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from './services/http-service/http.service';
import { UserStateService } from './services/user-services/user-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('routerBlockDiv') routerBlockDiv: ElementRef;

  title = 'med-planner';

  constructor(private userState: UserStateService, private httpService: HttpService) {
    this.routerBlockDiv = new ElementRef(null);
  }


  ngAfterViewInit(): void {
    this.userState.checkLogin();
    this.requestLogin();
  }

  public onHeaderHeightInit(_headerHeight: number): void {
    try {
      this.routerBlockDiv.nativeElement.style.marginTop = _headerHeight + 'px';
    } catch (e) {
      console.error(e);
    }
  }

  private async requestLogin(): Promise<void> {
    const response = await this.httpService.postMessage(
      HttpService.LOGIN_URL,
      {
        username: 'test_user_2',
        password: 'Yxcvb56789'
      }
    );
    console.log('response', response);
    const responseGet = await this.httpService.getMessage(
      HttpService.LOGOUT_URL,
      {
        username: 'test_user_2'
      }
    );
    console.log('response', responseGet);
  }


}
