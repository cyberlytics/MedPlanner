import { AfterViewInit, OnDestroy, Component, ElementRef, ViewChild } from '@angular/core';
import { HttpService } from './services/http-service/http.service';
import { UserStateService } from './services/user-services/user-state.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AppStateService, Dashbord } from './services/state-services/app-state.service';
import { Subscription } from 'rxjs';
import { AppHeaderStateService, DrawerAction } from './services/state-services/app-header-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('routerBlockDiv') routerBlockDiv: ElementRef;
  @ViewChild('drawer') drawer: MatSidenav | undefined;

  title = 'med-planner';

  private token = '8c4bf13d40022c6c6a3ec6e4f1b38420a61fe1d9';

  private _onDashboardSwitcher: Subscription | undefined;
  private _onFilterClick: Subscription | undefined;
  private _onMenuClick: Subscription | undefined;

  constructor(
    private appState: AppStateService,
    private appHeaderState: AppHeaderStateService,
    private userState: UserStateService,
    private httpService: HttpService
  ) {
    this.routerBlockDiv = new ElementRef(null);
    this.userState.checkLogin();
  }


  ngAfterViewInit(): void {
    // this.userState.checkLogin();
    // this.requestLogin();
    // this.requestLogout();
    this.registerNewUser();
    // this.createDoctor();
    // this.updateDoctor();
    // this.detailDoctor();
    // this.deleteDoctor();
    // this.getDoctor();

    this._onDashboardSwitcher = this.appState.setOnDashboardSwitchListener(
      (dashboard: Dashbord) => { this.onDashboardSwitch(dashboard); }
    );

    this._onFilterClick = this.appHeaderState.setOnFilterClickListener(
      (action: DrawerAction) => {
        this.onDrawerAction(action);
      }
    );

    this._onMenuClick = this.appHeaderState.setOnMenuClickListener(
      (action: DrawerAction) => {
        this.onDrawerAction(action);
      }
    );
  }

  ngOnDestroy(): void {
    this._onDashboardSwitcher?.unsubscribe();
    this._onFilterClick?.unsubscribe();
    this._onMenuClick?.unsubscribe();
  }

  public onHeaderHeightInit(_headerHeight: number): void {
    try {
      this.routerBlockDiv.nativeElement.style.marginTop = _headerHeight + 'px';
    } catch (e) {
      console.error(e);
    }
  }

  private onDashboardSwitch(dashboard: Dashbord): void {
    // TODO
  }

  private onDrawerAction(action: DrawerAction): void {
    switch (action) {
      case DrawerAction.OPEN:
        this.drawer?.open();
        break;
      case DrawerAction.CLOSE:
        this.drawer?.close();
        break;
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
        username: 'test4@user.de', // 'user@mail.com',
        email: 'test4@user.de', // 'user@mail.com',         // ex@gmail.com
        password: 'HGdthsrzah', // 'HZ86IH7zg98t5ouuo7', // 6787ZVIBU75FTHg5456ftzvbu
        is_superuser: false,
        is_staff: false
      }
    );
    console.log('response', response);
  }

  private async getDoctor(): Promise<void> {
    fetch(
      HttpService.DOCTOR_LIST,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Token ${this.token}`
        }
      }
    )
    .then((resp) => resp.json())
    .then( (data) => {
      console.log('Data', data);
    });
  }

  private async createDoctor(): Promise<void> {
    fetch(
      HttpService.DOCTOR_CREATE,
      {
        method: 'POST',
        headers: {
          'Content-type':'application/json',
          'Authorization': `Token ${this.token}`
        },
        body:JSON.stringify({
          "doctor_first_name": "Harry",
          "doctor_last_name": "Potter",
          "surgery_id": 1,
          "specializations": [
              1
          ]
        })
      }
    )
    .then(function(response){
      console.log('Response', response)
    });
  }

  private async updateDoctor(): Promise<void> {
    const id = '9';
    fetch(
      HttpService.DOCTOR_UPDATE + id,
      {
        method: 'POST',
        headers: {
          'Content-type':'application/json',
          'Authorization': `Token ${this.token}`
        },
        body:JSON.stringify({
          "doctor_first_name": "Mad",
          "doctor_last_name": "Max",
          "surgery_id": 1,
          "specializations": [
              1
          ]
        })
      }
    )
    .then(function(response){
      console.log('Response', response)
    });
  }

  private async detailDoctor(): Promise<void> {
    const id = '12';
    fetch(
      HttpService.DOCTOR_DETAIL + id,
      {
        method: 'GET',
        headers: {
          'Content-type':'application/json',
          'Authorization': `Token ${this.token}`
        }
      }
    )
    .then((resp) => resp.json())
    .then(function(data){
      console.log('Response', data)
    });
  }

  private async deleteDoctor(): Promise<void> {
    const id = '10';
    fetch(
      HttpService.DOCTOR_DELETE + id,
      {
        method: 'DELETE',
        headers: {
          'Content-type':'application/json',
          'Authorization': `Token ${this.token}`
        }
      }
    )
    .then(function(response){
      console.log('Response', response)
    });
  }
}
