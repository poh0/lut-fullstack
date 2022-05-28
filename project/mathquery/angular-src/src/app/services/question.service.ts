import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  url = 'http://localhost:5000/api/posts'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // GET questions from server
  getQuestions(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.http.get<any>(this.url, {headers})
  }

  // GET question by id
  getQuestion(id: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url, {headers})
  }
  
  // POST a new question
  postQuestion(question: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('Authorization', this.authService.authToken)
    console.log(headers)
    return this.http.post(`${this.url}`, question, {headers})
  }

}
