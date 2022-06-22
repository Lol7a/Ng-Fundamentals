import { Component, Input } from '@angular/core';
import { IEvent } from './shared/event.model';

@Component({
  selector: 'event-thumbnail',
  template: `
    <div [routerLink]="['/events', event.id]" class="well thumbnail">
      <h2>{{ event?.name | uppercase }}</h2>
      <div>Date: {{ event?.date | date: 'shortDate' }}</div>
      <!-- ADDING CSS CLASS BASED ON THE TIME -->
      <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">
        Time: {{ event?.time }}
        <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
        <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
        <span *ngSwitchDefault>(Normal Start)</span>
      </div>
      <div>Price: {{ event?.price | currency: 'USD' }}</div>
      <!-- IF LOCATION IS PROVIDED IT WILL SHOW THIS TEXT -->
      <div *ngIf="event?.location">
        <span>Location: {{ event?.location?.address }}</span>
        <span class="pad-left">
          {{ event?.location?.city }}, {{ event?.location?.country }}
        </span>
      </div>
      <!-- IF ONLINE URL IS PROVIDED IT WILL SHOW THIS TEXT -->
      <div *ngIf="event?.onlineUrl">Online URL: {{ event?.onlineUrl }}</div>
    </div>
  `,
  styles: [
    `
      .green {
        color: #0fae61 !important;
      }

      .bold {
        font-weight: bold;
      }

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
export class EventThumbnailComponent {
  @Input() event: IEvent;

  // METHOD THAT SETS DIFFERENT STYLES BASED ON THE TIME
  getStartTimeClass() {
    const isEarlyStart = this.event && this.event.time === '8:00 am';

    return {
      green: isEarlyStart,
      bold: isEarlyStart,
    };
  }
}
