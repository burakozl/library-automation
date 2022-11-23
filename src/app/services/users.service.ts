import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private controllerUrl = `${environment.apiUrl}/users`;

  constructor(
    private httpClient:HttpClient
  ) { }

  createAccount(user:User){
    return this.httpClient.post<User>(`${this.controllerUrl}`,user);
  }

  getUsers(){
    return this.httpClient.get<User[]>(`${this.controllerUrl}`);
  }

  getUser(email:string){
    return this.httpClient.get<User[]>(`${this.controllerUrl}?email=`+email);//query param ile varsa ilgili user get et...
  }

}
