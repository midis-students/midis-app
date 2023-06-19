import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const ROOT_DEFAULT = 'root';

export const VIEW_SCHEDULE = 'schedule';

export const VIEW_SCHEDULE_PANELS = {
  Default: 'default',
} as const;

export const routes = RoutesConfig.create([
  createRoot(ROOT_DEFAULT, [
    createView(VIEW_SCHEDULE, [createPanel(VIEW_SCHEDULE_PANELS.Default, `/`)]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
