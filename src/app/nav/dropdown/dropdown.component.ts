import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from 'src/app/events';
import { IEvent } from 'src/app/events';

@Component({
  selector: 'app-dropdown',
  template: `
    <a [routerLink]="['/events', event.id]" class="dropdown-item">
      {{ event.name }}
    </a>
  `,
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() event: IEvent;

  constructor() {}

  ngOnInit() {}
}
