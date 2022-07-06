import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { ISession } from '../shared';

@Injectable()
export class VoterService {
  constructor(private http: HttpClient) {}

  // METHOD THAT IS SUPPOSED TO DELETE A VOTER
  // BUT IT DOESN'T WORK
  // DIDN'T FIGURE OUT WHY xD
  deleteVoter(eventId: number, session: ISession, voterName: string) {
    session.voters = session.voters.filter((voter) => voter !== voterName);

    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http
      .delete(url)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  // METHOD THAT ADDS A VOTER
  // NOT SURE HOW IT WORKS
  addVoter(eventId: number, session: ISession, voterName: string) {
    session.voters.push(voterName);

    const options = {
      headers: new HttpHeaders({ 'Content-Type': '/application/json' }),
    };
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;
    this.http
      .post(url, {}, options)
      .pipe(catchError(this.handleError('addVoter')))
      .subscribe();
  }

  userHasVoted(session: ISession, voterName: string) {
    return session.voters.some((voter) => voter === voterName);
  }

  // METHOD FOR HANDLINNG AN ERROR
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
