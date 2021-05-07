import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
  }

  signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      this.loginService.removeUserId();
    });
    this.router.navigate(['']);
  }

  // addCourse() {
  //   this.router.navigate(['course']);
  // }

}
