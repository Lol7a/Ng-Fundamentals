import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../shared/event.service';
import { IEvent } from '../shared/index';

declare let toastr: any;

@Component({
  templateUrl: './events-list.component.html',
  styles: [
    `
      .col-4 {
        padding: 5px;
      }

      event-thumbnail {
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
      }

      button {
        background-color: rgb(15, 174, 97);
        color: white;
      }
      button:hover {
        background-color: rgb(78, 184, 133);
        color: white;
      }

      button.active {
        background-color: rgb(78, 184, 133);
      }

      button:not(:last-of-type) {
        margin-right: 5px;
      }
    `,
  ],
})
export class EventsListComponent implements OnInit {
  events: IEvent[];
  event: IEvent;
  sortBy: string = 'ASC';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.events = this.route.snapshot.data['events'];
  }
}
