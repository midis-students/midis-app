import React from 'react';
import ReactDOM from 'react-dom/client';
import bridge from '@vkontakte/vk-bridge';

import { AppConfig } from '@/AppConfig';

import '@vkontakte/vkui/dist/cssm/styles/themes.css';
import './index.css';

bridge.send('VKWebAppInit').then(() => console.log('[bridge] init'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppConfig />
);

if (import.meta.env.DEV) {
  import('./eruda').then(() => console.log('[eruda] loaded'));
}
