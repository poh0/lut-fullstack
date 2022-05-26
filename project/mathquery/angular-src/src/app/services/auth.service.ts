import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any
  user: any
  
  url = "http://localhost:5000/api/users"

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: any): Observable<any> {
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${this.url}/register`, user, {headers})
  }

  authenticateUser(user: any): Observable<any> {
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${this.url}/authenticate`, user, {headers})
  }

  storeUserData(token: string, user: any) {
    localStorage.setItem('id_token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.authToken = token
    this.user = user
  }

  loadToken () {
    const token = localStorage.getItem("id_token")
    this.authToken = token
  }

}
