import React, { Suspense } from 'react';
import {
  useActiveVkuiLocation,
  usePopout,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router';
import {
  Epic,
  ModalRoot,
  Root,
  ScreenSpinner,
  SplitCol,
  SplitLayout,
} from '@vkontakte/vkui';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import Navbar from '@/Nabbar';
import { routes } from '@/router';
import { JournalView } from '@/views/Journal';
import { ProfileView } from '@/views/Profile';
import { ScheduleView } from '@/views/Schedule';

export const App = () => {
  const routerPopout = usePopout();
  const routeNavigator = useRouteNavigator();

  const {
    root: activeRoot = routes.root.id,
    view: activeView = routes.root.schedule.id,
    modal: activeModal,
  } = useActiveVkuiLocation();

  const modal = (
    <ModalRoot
      activeModal={activeModal}
      onClose={() => routeNavigator.hideModal()}
    ></ModalRoot>
  );

  const views = [
    {
      id: 'schedule',
      element: ScheduleView,
    },
    {
      id: 'journal',
      element: JournalView,
    },

    {
      id: 'profile',
      element: ProfileView,
    },
  ];

  return (
    <SplitLayout popout={routerPopout} modal={modal}>
      <SplitCol width={'100%'} stretchedOnMobile autoSpaced>
        <Epic activeStory={activeRoot} tabbar={<Navbar />}>
          <Root activeView={activeView} nav={routes.root.id}>
            {views.map((view) => (
              <ErrorBoundary key={view.id} id={view.id}>
                <Suspense fallback={<ScreenSpinner />}>
                  <view.element nav={view.id} />
                </Suspense>
              </ErrorBoundary>
            ))}
          </Root>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
