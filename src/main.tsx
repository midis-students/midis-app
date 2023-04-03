import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';
import { RouterContext } from '@happysanta/router';
import { router } from '@/router';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterContext.Provider value={router}>
      <ConfigProvider>
        <AdaptivityProvider>
          <AppRoot>
            <App />
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </RouterContext.Provider>
  </React.StrictMode>
);

if (import.meta.env.DEV) {
  import('./eruda').then(() => console.log('[eruda] loaded'));
}
