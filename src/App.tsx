import React from 'react';
import {
  useActiveVkuiLocation,
  usePopout,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router';
import { Epic, ModalRoot, Root, SplitCol, SplitLayout } from '@vkontakte/vkui';

import { ROOT_DEFAULT, VIEW_SCHEDULE } from '@/router';
import { ScheduleView } from '@/views/Schedule';

export const App = () => {
  const routerPopout = usePopout();
  const routeNavigator = useRouteNavigator();

  const {
    root: activeRoot = ROOT_DEFAULT,
    view: activeView = VIEW_SCHEDULE,
    modal: activeModal,
  } = useActiveVkuiLocation();

  const modal = (
    <ModalRoot
      activeModal={activeModal}
      onClose={() => routeNavigator.hideModal()}
    ></ModalRoot>
  );

  return (
    <SplitLayout popout={routerPopout} modal={modal}>
      <SplitCol>
        <Epic activeStory={activeRoot}>
          <Root activeView={activeView} nav={ROOT_DEFAULT}>
            <ScheduleView nav={VIEW_SCHEDULE} />
          </Root>
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};
