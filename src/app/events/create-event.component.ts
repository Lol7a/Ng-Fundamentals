import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './shared/index';

@Component({
  templateUrl: './create-event.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }

      .error input {
        background-color: #e3c3c5;
      }

      .error ::-webkit-input-placeholder {
        color: #999;
      }

      .error ::-moz-placeholder {
        color: #999;
      }

      .error :-moz-placeholder {
        color: #999;
      }

      .error :ms-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class CreateEventComponent {
  // DECLARING ~ DEFINING PROPERTIES
  newEvent: any;
  isDirty: boolean = true;

  constructor(private router: Router, private eventService: EventService) {}

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
