import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  api_url = 'http://localhost:3061';


  authToken: any;
  user: any;
  profile: any;
  constructor(private http: Http) {
       //this.isDev = true;  // Change to false before deployment
      }
//#region "User "
  registerUser(user) {
    console.log(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const userregisterUrl = `${this.api_url}/user/register`;
    return this.http.post(userregisterUrl, user, {headers: headers})
      .map(res => res.json());
  }

  authenticateUser(user) {
    let headers = new Headers();
    console.log(user);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3061/user/authenticate', user, {headers: headers})
      .map(res => res.json());
  }
//#endregion "*****"
//#region "Profile"
getProfile() {
    const headersProfile = new Headers();
    this.loadToken();
    headersProfile.append('Authorization', this.authToken);
    headersProfile.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3061/user/profile', {headers: headersProfile})
      .map(res => res.json());
}
createnewProfile(profile) {
  const headersNewProfile = new Headers();
  console.log(profile);
  headersNewProfile.append('Content-Type', 'application/json');
  const profileUrl = `${this.api_url}/patient`;
  console.log(profileUrl);
  return this.http.post(profileUrl, profile, {headers: headersNewProfile})
   .map(res => res.json());
}

//#endregion "profile"
//#region "token"
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return tokenNotExpired('id_token');
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getReport(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.api_url+'/patient/report/'+id, {headers: headers})
      .map(res => res.json());
  }

  getDoctor(searchData) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.api_url+'/patient/doctor/'+searchData, {headers: headers})
      .map(res => res.json());
  }
  //#endregion "****"
}
