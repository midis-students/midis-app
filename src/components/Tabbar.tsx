import React from 'react';

import * as Routes from '../router';
import { useLocation, useRouter } from '@happysanta/router';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Icon28Favorite, Icon28NewsfeedOutline, Icon28UserOutline } from '@vkontakte/icons';

export default function CustomTabbar() {
  const location = useLocation();
  const router = useRouter();

  const click = (e: React.MouseEvent) => {
    ///@ts-ignore
    router.pushPage(e.currentTarget.dataset.page);
  };

  return (
    <Tabbar>
      <TabbarItem
        onClick={click}
        data-page={Routes.PAGE_MARKS}
        selected={location.getViewId() === Routes.VIEW_MARKS}
        text="Успеваемость">
        <Icon28Favorite />
      </TabbarItem>
      <TabbarItem
        onClick={click}
        data-page={Routes.PAGE_TABLE}
        selected={location.getViewId() === Routes.VIEW_TABLE}
        text="Расписание">
        <Icon28NewsfeedOutline />
      </TabbarItem>
      <TabbarItem
        onClick={click}
        data-page={Routes.PAGE_PROFILE}
        selected={location.getViewId() === Routes.VIEW_PROFILE}
        text="Профиль">
        <Icon28UserOutline />
      </TabbarItem>
    </Tabbar>
  );
}
