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

  private token = '36bdfd6351f97a7019b2299ba9b11a574d7d88bc';

  constructor(private userState: UserStateService, private httpService: HttpService) {
    this.routerBlockDiv = new ElementRef(null);
    this.userState.checkLogin();
  }


  ngAfterViewInit(): void {
    // this.userState.checkLogin();
    // this.requestLogin();
    // this.requestLogout();
    // this.registerNewUser();
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
        email: 'test4@user.de',
        password: 'HGdthsrzah',
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
          'Content-type':'application/json',
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
          "doctor_id": 58,
          "user": 10,
          "date_time": "2021-11-27 15:15:00",
          "notes": "kjhgfde56zujko9876tfdse5tzhjko",
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
          "doctor_id": 59,
          "user": 10,
          "date_time": "2021-12-01 15:15:00",
          "notes": "here is a text",
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

  private async detailAppointment(): Promise<void> {
    const id = '2';
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

  private async deleteAppointment(): Promise<void> {
    const id = '2';
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
