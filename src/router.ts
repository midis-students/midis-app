import { Page, RouteList, Router } from '@happysanta/router';

export const PAGE_AUTH = '/';
export const PAGE_TABLE = '/table';
export const PAGE_MARKS = '/marks';
export const PAGE_PROFILE = '/profile';

export const PANEL_AUTH = 'panel_auth';
export const PANEL_TABLE = 'panel_table';
export const PANEL_MARKS = 'panel_marks';
export const PANEL_PROFILE = 'panel_profile';

export const VIEW_AUTH = 'view_auth';
export const VIEW_TABLE = 'view_table';
export const VIEW_MARKS = 'view_marks';
export const VIEW_PROFILE = 'view_profile';

const routes: RouteList = {
  [PAGE_AUTH]: new Page(PANEL_AUTH, VIEW_AUTH),
  [PAGE_PROFILE]: new Page(PANEL_PROFILE, VIEW_PROFILE),
  [PAGE_TABLE]: new Page(PANEL_TABLE, VIEW_TABLE),
  [PAGE_MARKS]: new Page(PANEL_MARKS, VIEW_MARKS),
};

export const router = new Router(routes);
router.start();
