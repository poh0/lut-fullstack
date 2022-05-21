import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: string = ""
  email: string = ""
  password: string = ""

  constructor(
    private validateService: ValidateService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    }

    // required fields
    if (!this.validateService.validateRegister(user)) {
      this.toastr.error("Please add all fields", "Error")
      return false
    }

    // validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.toastr.error("Please use a valid email", "Error")
      return false
    }

    return true
  }
}
