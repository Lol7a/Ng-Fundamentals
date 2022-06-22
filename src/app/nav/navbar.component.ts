import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { EventService, IEvent, ISession } from '../events';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent implements OnInit {
  // DECLARING ~ DEFINING PROPERTIES
  events: IEvent[];
  searchTerm: string = '';
  foundSessions: ISession[];
  id: number;

  constructor(
    public auth: AuthService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.eventService.getEvent(this.route.params['id']);
      this.id = +params['id'];
    });
  }

  // METHOD ON SEARCH FORM IN NAVBAR.COMPONENT.HTML
  // USES SEARCH TERM FOR SEARCING AND DISPLAYING SESSIONS
  searchSessions(searchTerm: string) {
    this.eventService.searchSessions(searchTerm).subscribe((sessions: any) => {
      this.foundSessions = sessions;
    });
  }

  onSelectedDropdown() {
    // this.router.navigate([`events/${this.id}`], {
    this.router.navigate([`events/${1}`], {
      relativeTo: this.route,
    });
  }
}
