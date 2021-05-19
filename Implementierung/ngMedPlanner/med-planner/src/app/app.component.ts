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
    console.log('response');
    const headers = new HttpHeaders({
      'user_name': 'test_user_2',
      'password': 'Yxcvb56789'
    });
    const response = await this.httpService.requestData(
      HttpService.LOGIN_URL,
      headers
      // {user_name: 'test_user_2', password: 'Yxcvb56789'}
    );
    console.log('response', response);
  }


}
