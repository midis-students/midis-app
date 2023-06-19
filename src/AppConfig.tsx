import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterProvider } from '@vkontakte/vk-mini-apps-router';
import { AdaptivityProvider, AppRoot, ConfigProvider } from '@vkontakte/vkui';

import { router } from '@/router';
import { useScheme } from '@/store/scheme';

import { App } from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
    },
  },
});

export const AppConfig = () => {
  const scheme = useScheme((select) => select.scheme);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
        <ConfigProvider
          isWebView={true}
          transitionMotionEnabled={true}
          appearance={scheme}
        >
          <AdaptivityProvider>
            <AppRoot>
              <App />
            </AppRoot>
          </AdaptivityProvider>
        </ConfigProvider>
      </RouterProvider>
    </QueryClientProvider>
  );
};
