import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MyserviceService {

  constructor(private _http: HttpClient) { }

  host = 'http://localhost:3000/api/';

  submitRegister(body:any){
    return this._http.post(this.host + 'auth/register', body, {});
  }

  login(body:any){
    body['handle'] = body['email'];
    return this._http.post(this.host + 'auth/login', body,{
      observe:'body'
    });
  }

  getUserName() {
    return localStorage.getItem('username');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
  }

  loggedIn(){
    if (localStorage.getItem('token')){
      return true;
    }
    return false;
  }

  locationSearch(lat, lon){
    return this._http.get(this.host + 'users/location?lng=' + lon + '&lat='+lat,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  // getTelephoneNuber() {
  //   return this._http.get('http://localhost:3003/usersRegi/telephone', {
  //     observe: 'body',
  //     params: new HttpParams().append('token', localStorage.getItem('token'))
  //   });
  // }

  submitRegi(body:any){
    return this._http.post(this.host + 'auth/registerdetails', body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

}
