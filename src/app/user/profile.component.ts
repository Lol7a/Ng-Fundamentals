import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { TOASTR_TOKEN, Toastr } from '../common/index';

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  // DECLARING ~ DEFINING PROPERTIES
  profileForm: FormGroup;
  private firstName: FormControl;
  private lastName: FormControl;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(TOASTR_TOKEN) private toastr: Toastr
  ) {}

  ngOnInit() {
    // CREATING FIRST NAME FORM CONTROL (FORM CONTROL INSTANCE),
    // WITH REQUIRED VALIDATORS AND PATTERNS
    this.firstName = new FormControl(this.authService.currentUser?.firstName, [
      Validators.required,
      Validators.pattern('[a-zA-Z].*'),
    ]);
    // CREATING LAST NAME FORM CONTROL (FORM CONTROL INSTANCE),
    // WITH REQUIRED VALIDATORS
    this.lastName = new FormControl(
      this.authService.currentUser?.lastName,
      Validators.required
    );

    // CREATING EDIT PROFILE FORM GROUP (FORM GROUP INSTANCE),
    // AND DECLARING IT'S CHILDREN, I.E.
    // CHILD FORM CONTROL
    this.profileForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
    });
  }

  // METHOD WHEN PROFILE EDIT FORM IS SUBMITTED, CHECKS IF FORM IS VALID,
  // UPDATES FIRST AND LAST NAME OF THE CURRENT USER AND SHOWS TOASTR SUCCESS MESSAGE
  saveProfile(formValues: any) {
    if (this.profileForm.valid) {
      this.authService
        .updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe(() => {
          this.toastr.success('Profile Saved');
        });
    }
  }

  // METHOD ON LOGOUT BUTTON IN PROFILE.HTML,
  // IF CLICKED IT LOGS OUT AND NAVIGATES US TO ALL EVENTS PAGE
  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    });
  }

  // VALIDATES - CHECKS IF FIRST NAME INPUT IS VALID OR IT HAS BEEN TOUCHED
  validateFirstName() {
    return this.firstName.valid || this.firstName.touched;
  }

  // VALIDATES - CHECKS IF LAST NAME INPUT IS VALID OR IT HAS BEEN TOUCHED
  validateLastName() {
    return this.lastName.valid || this.lastName.touched;
  }

  // METHOD ON CANCEL BUTTON IN PROFILE.COMPONENT.HTML,
  // IF CLICKED IT CANCELS PROFILE EDIT AND NAVIGATES US TO LOGIN PAGE
  cancel() {
    this.router.navigate(['events']);
  }
}
