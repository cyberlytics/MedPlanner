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

  private token = '73142089d71cc8149d902f9d1d422a2182117289';

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
    // this.createDoctor();
    // this.createAppointment();
    // this.updateDoctor();
    // this.updateAppointment();
    // this.detailDoctor();
    // this.detailAppointment();
    // this.deleteDoctor();
    // this.deleteAppointment();
    // this.getDoctor();
    // this.getAppointment();

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
    .then(function(data){
      console.log('List of doctors: ', data);
    });
  }

  private async getAppointment(): Promise<void> {
    fetch(
      HttpService.APPOINTMENT_LIST,
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
      console.log('List of appointments: ', data);
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
          "first_name": "Harry",
          "surname": "Potter",
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

  private async createAppointment(): Promise<void> {
    fetch(
      HttpService.APPOINTMENT_CREATE,
      {
        method: 'POST',
        headers: {
          'Content-type':'application/json',
          'Authorization': `Token ${this.token}`
        },
        body:JSON.stringify({
          "title": "Termin beim Augenarzt",
          "doc_id": 1,
          "user_id": 1,
          "datetime": "2021-11-28 15:15:00",
          "priority": "Hoch",
          "note": "Nach Augentropfen fragen",
          "tags": [
            
          ]
        })
      }
    )
    .then(function (response) {
      return response.text()
    }).then(function (data) {
      console.log(data)
    }).catch(console.error)
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
          "first_name": "Mad",
          "surname": "Max",
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

  private async updateAppointment(): Promise<void> {
    const id = '2';
    fetch(
      HttpService.APPOINTMENT_UPDATE + id,
      {
        method: 'POST',
        headers: {
          'Content-type':'application/json',
          'Authorization': `Token ${this.token}`
        },
        body:JSON.stringify({
          "title": "termin 1.1",
          "doc_id": 1,
          "user_id": 1,
          "datetime": "2021-12-01 15:15:00",
          "priority": "Mittel",
          "note": "here is a text",
          "tags": [
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
    const id = '1';
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

  private async detailAppointment(): Promise<void> {
    const id = '1';
    fetch(
      HttpService.APPOINTMENT_DETAIL + id,
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
    const id = '11';
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

  private async deleteAppointment(): Promise<void> {
    const id = '5';
    fetch(
      HttpService.APPOINTMENT_DELETE + id,
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
