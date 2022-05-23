import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError } from 'rxjs';
import { response } from 'express';

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
}
