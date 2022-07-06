import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import {
  EventsListComponent,
  EventThumbnailComponent,
  EventService,
  EventDetailsComponent,
  CreateEventComponent,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  DurationPipe,
  EventResolver,
} from './events/index';

import {
  JQ_TOKEN,
  CollapsibleWellComponent,
  SimpleModalComponent,
  ModalTriggerDirective,
  TOASTR_TOKEN,
  Toastr,
} from './common/index';
import { EventsAppComponent } from './events-app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavBarComponent } from './nav/navbar.component';
import { Error404Component } from './errors/404.component';

import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './user/auth.service';
import { DropdownComponent } from './nav/dropdown/dropdown.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';

let toastr: Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  // MODULES
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  // COMPONENTS, DIRECTIVES AND PIPES
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    DurationPipe,
    LocationValidator,
    DropdownComponent,
    EventEditComponent,
  ],
  // SERVICES
  providers: [
    EventService,
    EventListResolver,
    AuthService,
    EventResolver,
    VoterService,
    { provide: JQ_TOKEN, useValue: jQuery },
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
  ],
  bootstrap: [EventsAppComponent],
})
export class AppModule {}

export function checkDirtyState(component: CreateEventComponent) {
  // CANCELLATION OF CREATING AN EVENT
  if (component.isDirty) {
    return window.confirm(
      'You have not saved this event, do you really want to cancel?'
    );
  } else {
    return true;
  }
}
