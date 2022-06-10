import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
    `,
  ],
})
export class LoginComponent {
  // DECLARING ~ DEFINING PROPERTIES
  userName: any;
  password: any;
  mouseoverLogin: boolean;
  loginInvalid = false;

  constructor(private authService: AuthService, private router: Router) {}

  // METHOD ON FORM IN LOGIN.COMPONENT.HTML,
  // WHEN USERS LOG IN FORM IS SUBMITTED, CHECKS IF FORM IS VALID,
  // WAITING FORR RESPONSE, IF RESPONSE IS FALSE THAT THE FORM IS INVALID,
  // IF RESPONS IS VALID IT TAKES US TO ALL EVENTS PAGE
  login(formValues: any) {
    this.authService
      .loginUser(formValues.userName, formValues.password)
      .subscribe((resp) => {
        if (!resp) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events']);
        }
      });
  }

  // METHOD ON BUTTON IN LOGIN.COMPONENT.HTML,
  // IF CLICKED IT CANCELS LOG IN AND
  // NAVIGATES US TO ALL EVENTS PAGE
  cancel() {
    this.router.navigate(['events']);
  }
}
