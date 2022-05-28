import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user: any) {
    if (!user.name ||!user.email ||!user.password) {
      return false
    } else {
      return true
    }
  }

  validateLogin(user: any) {
    if (!user.email ||!user.password) {
      return false
    } else {
      return true
    }
  }

  validateQuestion(question: any) {
    if (!question.body || !question.title) {
      return false
    } else {
      return true
    }
  }

  validateEmail(email: string) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email)
  }
}
