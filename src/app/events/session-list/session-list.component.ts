import { Component, Input, OnChanges } from '@angular/core';
import { EventService, ISession } from '../shared/index';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from '../vote/voter.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss'],
})
export class SessionListComponent implements OnChanges {
  // DEFINING INPUT PROPERTIES
  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  @Input() eventId: number;
  sessionsChanged = new Subject<ISession[]>();
  visibleSessions: ISession[] = [];
  id: number;

  constructor(
    public auth: AuthService,
    private voterService: VoterService,
    private eventService: EventService
  ) {}

  // METHOD WHICH IS INVOKED BY CHANGES
  // IT FILTERS (SORTS) THE SESSIONS BY
  // THEIR NAME OR VOTING COUNT
  ngOnChanges() {
    console.log(this.sessions);
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name'
        ? this.visibleSessions.sort(sortByNameAsc)
        : this.visibleSessions.sort(sortByVotesDesc);
      console.log(this.visibleSessions);
    }
  }

  // METHOD ON UPVOTE IN SESSION-LIST.COMPONENT.HTML
  // IF USER HAS ALREDY VOTED THAN IT SHOULD CALL
  // DELETEVOTER METHOD AND REMOVE VOTER,
  // OTHERWISE IT SOULD CALL ADDVOTER METHOD
  toggleVote(session: ISession) {
    if (this.userHasVoted(session)) {
      this.voterService.deleteVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    } else {
      this.voterService.addVoter(
        this.eventId,
        session,
        this.auth.currentUser.userName
      );
    }
    if (this.sortBy === 'votes') {
      this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  // METHOD THAT CHECKS IF CURRENT USER HAS VOTED
  userHasVoted(session: ISession) {
    console.log(
      'User has voted!' + this.visibleSessions['currentUser']?.userName
    );
    return this.voterService.userHasVoted(
      session,
      this.auth.currentUser.userName
    );
  }

  deleteSession(index: number) {
    this.visibleSessions.splice(index, 1);
    this.sessionsChanged.next(this.sessions.slice());
  }

  onDeleteSession() {
    this.deleteSession(this.id);
    console.log(this.id);
  }

  filterSessions(filter: any) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);
    } else {
      this.visibleSessions = this.sessions.filter((session) => {
        return session.level.toLocaleLowerCase() === filter;
      });
    }
  }
}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) return 1;
  else if (s1.name === s2.name) return 0;
  else return -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
