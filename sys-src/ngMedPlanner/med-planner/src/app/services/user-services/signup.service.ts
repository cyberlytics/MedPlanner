import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserMock } from '../data-interfaces/data-interfaces';
import { HttpService } from '../http-service/http.service';


@Injectable({
  providedIn: 'root'
})

export class SignUpService{

  constructor(private httpService: HttpService, private router: Router) { }

  public async signup(_email: string, _password: string): Promise<RegisterResult> {
    // return this.loginMockCall(_email, _password);

    const response = await this.httpService.postMessage<any>(
        HttpService.REGISTER_NEW_USER_URL,
        {
          username: _email,
          password: _password
        }
    ).catch( (result) => {
        console.error(result);
        return RegisterResult.SERVER_ERROR;
    });
    console.log('response', response);

    if (response.ok === 'false') {
      console.log("ist falsch");
      return RegisterResult.EMAIL_ALREADY_EXIST 
    }

    if (response.status === '500') {
      console.log("Server fehler");
      return RegisterResult.SERVER_ERROR;
    }

    return RegisterResult.UNKNOWN_ERROR;
  }
}




export enum RegisterResult {
  SIGNUP_SUCCESFULL,
  EMAIL_ALREADY_EXIST,
  SERVER_ERROR,
  UNKNOWN_ERROR
}
