import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { EventService, IEvent } from '../shared';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.scss'],
})
export class EventEditComponent implements OnInit {
  events: IEvent[];
  event: IEvent;
  id: number;
  eventEditForm: FormGroup;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.event = data['event'];
      this.initForm();
    });
  }

  onSubmit() {
    console.log(this.eventEditForm);
  }

  updateEvent(formValues: any) {
    if (this.eventEditForm.valid) {
      this.eventService
        .editEvent(formValues.date, formValues.time, formValues.price)
        .subscribe(() => {
          console.log(formValues.date, formValues.time, formValues.price);
          this.router.navigate([`events`]);
        });
    }
  }

  onCancel() {
    this.router.navigate(['events']);
  }

  // updateEvent(index: number, newEvent: IEvent) {
  //   this.events[index] = newEvent;
  // }

  private initForm() {
    let eventDate = this.event.date;
    let eventTime = this.event.time;
    let eventPrice = this.event.price;

    this.eventEditForm = new FormGroup({
      date: new FormControl(eventDate, Validators.required),
      time: new FormControl(eventTime, Validators.required),
      price: new FormControl(eventPrice, Validators.required),
    });
  }
}
