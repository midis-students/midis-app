import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const routes = RoutesConfig.create([
  createRoot('root', [
    createView('schedule', [createPanel('default', `/`)]),
    createView('journal', [createPanel('default', '/journal')]),
    createView('profile', [createPanel('default', '/profile')]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
