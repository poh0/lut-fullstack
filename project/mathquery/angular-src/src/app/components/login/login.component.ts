import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';

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
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
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

    // https://rxjs.dev/deprecations/subscribe-arguments
    this.authService.authenticateUser(user).subscribe(
      {
        next: (data) => {
          if (data.success) {
            this.authService.storeUserData(data.token, data.user)
            this.toastr.success("You are now logged in", "Success")
            this.router.navigate(['/dashboard'])
          } 
        }
        ,error: (err) => {
          this.toastr.error(`Something went wrong: ${err.error.msg}`, "Error")
          this.router.navigate(['/login'])
        }
      })
      
     return true
  }

}
