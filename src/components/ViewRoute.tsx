import { FC, ReactNode } from 'react';
import {
  useActiveVkuiLocation,
  useGetPanelForView,
  usePopout,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router';
import { View } from '@vkontakte/vkui';

type ViewProps = {
  nav: string;
  defaultPanel: string;
  children: ReactNode;
};

export const ViewRoute: FC<ViewProps> = (props) => {
  const activePanel = useGetPanelForView(props.nav);
  const routerPopout = usePopout();
  const routeNavigator = useRouteNavigator();
  const { modal: activeModal, panelsHistory } = useActiveVkuiLocation();

  const history = activeModal || routerPopout ? [] : panelsHistory;

  return (
    <View
      nav={props.nav}
      history={history}
      activePanel={activePanel ?? props.defaultPanel}
      onSwipeBack={() => routeNavigator.back()}
    >
      {props.children}
    </View>
  );
};
