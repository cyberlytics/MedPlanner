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
    console.log(_email,_password);
    try{
      const response = await this.httpService.postMessage<any>(
        HttpService.REGISTER_NEW_USER_URL,
        {
          email: _email,
          password: _password
        });
    } catch (error){
      console.log(error);
      if (error.status === HttpService.HTTP_403_FORBIDDEN) { 
        return RegisterResult.EMAIL_ALREADY_EXIST; 
      }

      if (error.status === HttpService.HTTP_500_INTERNAL_SERVER_ERROR) {
        console.log('Server fehler');
        return RegisterResult.SERVER_ERROR;
      }

    }

    return RegisterResult.SIGNUP_SUCCESFULL;
  }
}




export enum RegisterResult {
  SIGNUP_SUCCESFULL,
  EMAIL_ALREADY_EXIST,
  SERVER_ERROR,
  UNKNOWN_ERROR
}
