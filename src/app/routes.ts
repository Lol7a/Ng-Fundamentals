import { Routes } from '@angular/router';
import {
  EventsListComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventListResolver,
  CreateSessionComponent,
  EventResolver,
} from './events/index';
import { Error404Component } from './errors/404.component';

export const appRoutes: Routes = [
  // Route for creating new event
  {
    path: 'events/new',
    component: CreateEventComponent,
    canDeactivate: ['canDeactivateCreateEvent'],
  },
  // All events list
  {
    path: 'events',
    component: EventsListComponent,
    resolve: { events: EventListResolver },
  },
  // Event detail route
  {
    path: 'events/:id',
    component: EventDetailsComponent,
    resolve: { event: EventResolver },
  },
  // Creating new session
  { path: 'events/session/new', component: CreateSessionComponent },
  // 404
  { path: '404', component: Error404Component },
  // All events list
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];
