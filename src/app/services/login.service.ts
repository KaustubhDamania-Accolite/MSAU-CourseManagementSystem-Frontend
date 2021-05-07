import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_URL = "http://localhost:8080/";
  LOGIN = "addUser/";
  GET_USER_BY_EMAIL = "getUserByEmail/";
  GET_USER_BY_USER_ID = "getUserByUserId/";

  user: User;

  constructor(private http: HttpClient) { }

  public setUserId(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  public removeUserId() {
    console.log(localStorage.getitem('user'), 'to be removed');
    localStorage.removeItem('user')
  }

  public getUserId() {
    return localStorage.getItem('user');
  }

  public loginFromRemote(user: User): Observable<any>{
    console.log(user);
    return this.http.post(this.BASE_URL + this.LOGIN, user);
  }

  public getUserByEmailFromRemote(email: string): Observable<any> {
    return this.http.get(this.BASE_URL + this.GET_USER_BY_EMAIL + email);
  }

  public getUserByUserIdFromRemote(id: Number): Observable<any>{
    return this.http.get(this.BASE_URL + this.GET_USER_BY_USER_ID + id);
  }

}
