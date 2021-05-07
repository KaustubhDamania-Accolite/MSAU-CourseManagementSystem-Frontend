import { Component, NgZone, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
// import { AuthenticationService } from '@app/_services';
// import { AuthService } from '@auth0/auth0-angular';
import { FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { User } from '../../Models/User';
import { GoogleApiService } from 'ng-gapi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  googleLogoURL = 'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg';
  // gapi : any;
  // user: SocialUser;
  // userfromEmail: any;
  // emailId: string;
  // password: string;
  // invalidLogin: boolean = false;
  // loginForm: FormGroup;

  user: User = new User();

  constructor(
      private matIconRegistry: MatIconRegistry,
      private domSanitizer: DomSanitizer,
      private ngZone: NgZone,
      private loginService: LoginService,
      private router: Router
      // private gapi: GoogleApiService
      ) {
        this.matIconRegistry.addSvgIcon('logo', this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogoURL));
        window['onSignIn'] = (user: any) => ngZone.run( () => {
          this.onSignIn(user);
        });
      }

  ngOnInit(): void {
  }

  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log("rxycuvibeng");
    // user1: User;
    // user = new User(profile.getName(), profile.getEmail(), new Date);

    this.user.email = profile.getEmail();
    this.user.firstName = profile.getName();
    this.user.dateOfJoining = new Date();
    

    this.loginService.loginFromRemote(this.user).subscribe(
      resp => {
        this.loginService.setUserId(this.user)
        console.log("EMAil: :  :: :: : : :", profile.getEmail())
        console.log("SignedIn");
        this.router.navigate(['/viewCourse']);

      }
    );
  }

  


}
