import { Page, Router } from '@happysanta/router';

export enum Modal {
  Example = 'example',
}

export enum Views {
  Schedule = 'schedule',
  Students = 'students',
  Profile = 'Profile',
}

export enum Panels {
  Schedule = 'schedule',
  Students = 'students',
  Profile = 'profile',
}

export enum Pages {
  Schedule = '/',
  Students = '/students',
  Profile = '/profile/:id?',
}

const routes = {
  [Pages.Schedule]: new Page(Panels.Schedule, Views.Schedule),
  [Pages.Students]: new Page(Panels.Students, Views.Students),
  [Pages.Profile]: new Page(Panels.Profile, Views.Profile),
};

export const resolvePage = (page: Pages) => routes[page];

export const router = new Router(routes);

router.start();
