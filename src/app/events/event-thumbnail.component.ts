import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared/event.model';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div class="row g-3">
      <div *ngFor="let event of visibleEvents" class="col-md-6">
        <div [routerLink]="['/events', event.id]" class="well thumbnail ">
          <h2>{{ event.name | uppercase }}</h2>
          <div>Date: {{ event.date | date: 'mediumDate' }}</div>
          <!-- ADDING CSS CLASS BASED ON THE TIME -->
          <div [ngSwitch]="event.time">
            Time: {{ event.time }}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
          </div>
          <div>Price: {{ event.price | currency: 'USD' }}</div>
          <!-- IF LOCATION IS PROVIDED IT WILL SHOW THIS TEXT -->
          <div *ngIf="event.location">
            <span>Location: {{ event.location.address }}</span>
            <span class="pad-left">
              {{ event.location.city }}, {{ event.location.country }}
            </span>
          </div>
          <!-- IF ONLINE URL IS PROVIDED IT WILL SHOW THIS TEXT -->
          <div *ngIf="event.onlineUrl">Online URL: {{ event.onlineUrl }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .thumbnail {
        min-height: 210px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .pad-left {
        margin-left: 10px;
      }

      .well div {
        color: #bbb;
      }
    `,
  ],
})
export class EventThumbnailComponent implements OnInit, OnChanges {
  @Input() events: IEvent[];
  @Input() event: IEvent;
  @Input() sortBy: string;
  visibleEvents: IEvent[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.events = this.route.snapshot.data['events'];
    this.visibleEvents = this.events.slice(0);
  }

  ngOnChanges() {
    if (this.events) {
      this.sortBy === 'ASC'
        ? this.visibleEvents.sort(sortByDateAsc)
        : this.visibleEvents.sort(sortByDateDesc);
    }
  }
}

function sortByDateAsc(e1: IEvent, e2: IEvent) {
  return <any>new Date(e1.date) - <any>new Date(e2.date);
}

function sortByDateDesc(e1: IEvent, e2: IEvent) {
  return <any>new Date(e2.date) - <any>new Date(e1.date);
}
