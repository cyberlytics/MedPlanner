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
    this.userState.checkLogin();
  }


  ngAfterViewInit(): void {
    // this.userState.checkLogin();
    // this.requestLogin();
    // this.requestLogout();
    // this.registerNewUser();
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
  }

  private async requestLogout(): Promise<void> {
    const response = await this.httpService.postMessage(
      HttpService.LOGOUT_URL,
      {
        username: 'test_user_2'
      }
    );
    console.log('response', response);
  }

  private async registerNewUser(): Promise<void> {
    const response = await this.httpService.postMessage(
      HttpService.REGISTER_NEW_USER_URL,
      {
        username: 'test2@user.de', // 'user@mail.com',
        email: 'test2@user.de', // 'user@mail.com',         // ex@gmail.com
        password: 'HGh', // 'HZ86IH7zg98t5ouuo7', // 6787ZVIBU75FTHg5456ftzvbu
        is_superuser: false,
        is_staff: false
      }
    );
    console.log('response', response);
  }
}
