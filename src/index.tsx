import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import { RouterContext } from '@happysanta/router';
import { router } from './router';
import { ConfigProvider, AdaptivityProvider } from '@vkontakte/vkui';

import { ErrorBoundary } from './components/ErrorBoundary';
import RecoilRootWithStore from './atoms/RecoilRootWithStore';
import CatLoader from './components/CatLoader';

ReactDOM.render(
  <RecoilRootWithStore>
    <ErrorBoundary>
      <React.Suspense fallback={<CatLoader />}>
        <RouterContext.Provider value={router}>
          <ConfigProvider isWebView={true} transitionMotionEnabled={true}>
            <AdaptivityProvider>
              <App />
            </AdaptivityProvider>
          </ConfigProvider>
        </RouterContext.Provider>
      </React.Suspense>
    </ErrorBoundary>
  </RecoilRootWithStore>,
  document.getElementById('amogus'),
);

if (process.env.NODE_ENV === 'development') import('./eruda');
