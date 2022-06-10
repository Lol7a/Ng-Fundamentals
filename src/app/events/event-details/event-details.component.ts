import { Component } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent, ISession } from '../shared/index';

@Component({
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent {
  // DECLARING ~ DEFINING PROPERTIES
  event: IEvent;
  addMode: boolean;
  filterBy: string = 'all';
  sortBy: string = 'votes';

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.forEach((data) => {
      this.event = data['event'];
      this.addMode = false;
    });
  }

  addSession() {
    this.addMode = true;
  }

  // METHOD USED IN EVENT-DETAILS.COMPONENT.HTML
  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(
      null,
      this.event.sessions.map((s) => s.id)
    );
    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  // METHOD USED IN EVENT-DETAILS.COMPONENT.HTML
  // IT CANCELS ADDING SESSION BY TOGGLING ADDMODE
  // FROM TRUE TO FALSE
  cancelAddSession() {
    this.addMode = false;
  }
}
