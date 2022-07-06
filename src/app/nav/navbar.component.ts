import {
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';


import { EventService, IEvent, ISession } from '../events';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent implements OnInit {
  // DECLARING ~ DEFINING PROPERTIES
  p: number = 1;
  events: IEvent[];
  searchTerm: string = '';
  foundSessions: ISession[];

  constructor(
    public auth: AuthService,
    private eventService: EventService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.events = this.route.snapshot.data['events'];
  }

  // METHOD ON SEARCH FORM IN NAVBAR.COMPONENT.HTML
  // USES SEARCH TERM FOR SEARCING AND DISPLAYING SESSIONS
  searchSessions(searchTerm: string) {
    this.eventService.searchSessions(searchTerm).subscribe((sessions: any) => {
      this.foundSessions = sessions;
    });
  }


}
