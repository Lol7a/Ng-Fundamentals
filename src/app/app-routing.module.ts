import { RouterModule, Routes } from '@angular/router';
import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventListResolver,
  CreateSessionComponent,
  EventResolver,
} from './events/index';
import { Error404Component } from './errors/404.component';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './nav/navbar.component';
import { EventEditComponent } from './events/event-edit/event-edit.component';

const appRoutes: Routes = [
  // All events list
  { path: '', redirectTo: '/events', pathMatch: 'full' },

  // All events list
  {
    path: '',
    component: NavBarComponent,
    resolve: { events: EventListResolver },
    children: [
      {
        path: 'events',
        component: EventsListComponent,
        resolve: { events: EventListResolver },
      },

      {
        path: 'events/new',
        component: CreateEventComponent,
        // canDeactivate: ['canDeactivateCreateEvent'],
      },

      { path: 'events/session/new', component: CreateSessionComponent },

      {
        path: 'events/:id',
        component: EventDetailsComponent,
        resolve: { event: EventResolver },
      },

      {
        path: 'events/:id/edit',
        component: EventEditComponent,
        resolve: { event: EventResolver },
      },

      { path: '404', component: Error404Component },

      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
