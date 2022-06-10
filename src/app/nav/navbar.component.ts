import { Component } from '@angular/core';
import { EventService, ISession } from '../events';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavBarComponent {
  // DECLARING ~ DEFINING PROPERTIES
  searchTerm: string = '';
  foundSessions: ISession[];

  constructor(public auth: AuthService, private eventService: EventService) {}

  // METHOD ON SEARCH FORM IN NAVBAR.COMPONENT.HTML
  // USES SEARCH TERM FOR SEARCING AND DISPLAYING SESSIONS
  searchSessions(searchTerm: string) {
    this.eventService.searchSessions(searchTerm).subscribe((sessions: any) => {
      this.foundSessions = sessions;
    });
  }
}
