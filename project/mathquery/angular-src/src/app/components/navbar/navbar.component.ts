import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    public authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  loggedIn() {
    if (this.authService.loggedIn()) {
      return true
    }
    return false
  }

  logout() {
    this.authService.logout()
    this.toastr.success('You are now logged out', 'Success')
  }

}
