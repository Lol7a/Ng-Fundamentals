import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/auth.service';
import { EventService } from '../shared/index';

@Component({
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
  // DECLARING ~ DEFINING PROPERTIES
  isDirty: boolean = true;
  newEventForm: FormGroup;

  constructor(
    private router: Router,
    private eventService: EventService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.newEventForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      date: new FormControl(null, Validators.required),
      time: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      location: new FormGroup({
        address: new FormControl(null),
        city: new FormControl(null),
        country: new FormControl(null),
      }),
      onlineUrl: new FormControl(null),
      imageUrl: new FormControl(null, [
        Validators.required,
        Validators.pattern(/.*\/.*.(png|jpg)/),
      ]),
    });
  }

  // METHOD ON FORM IN CREATE-EVENT.COMPONENT.HTML
  // SAVES CREATED EVENT AND NAVIGATES US BACK TO
  // ALL EVENTS PAGE
  saveEvent(formValues: any) {
    this.eventService.saveEvent(formValues).subscribe(() => {
      this.isDirty = false;
      this.router.navigate(['/events']);
    });
  }

  // METHOD ON CANCEL BUTTON IN CREATE-EVENT.COMPONENT.HTML
  // CANCELS CREATING EVENT AND NAVIGATES
  // US BACK TO ALL EVENTS PAGE
  cancel() {
    this.router.navigate(['/events']);
  }
}
