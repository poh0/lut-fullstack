import { Component, OnInit } from '@angular/core';

import { ValidateService } from 'src/app/services/validate.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = ""
  password: string = ""

  constructor(
    private validateService: ValidateService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onLoginSubmit() {

    const user = {
      email: this.email,
      password: this.password
    }

    // required fields
    if (!this.validateService.validateLogin(user)) {
      this.toastr.error("Please add all fields", "Error")
      return false
    }

    // validate email
    if (!this.validateService.validateEmail(this.email)) {
      this.toastr.error("Please use a valid email", "Error")
      return false
    }

    return true
  }

}
