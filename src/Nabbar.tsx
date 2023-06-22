import {
  Icon28BookOutline,
  Icon28TablecellsOutline,
  Icon28UserOutline,
} from '@vkontakte/icons';
import {
  useActiveVkuiLocation,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';

import { routes } from '@/router';

const tabbars = [
  {
    view: routes.root.journal,
    text: 'Журнал',
    icon: <Icon28BookOutline />,
  },
  {
    view: routes.root.schedule,
    text: 'Расписание',
    icon: <Icon28TablecellsOutline />,
  },
  {
    view: routes.root.profile,
    text: 'Профиль',
    icon: <Icon28UserOutline />,
  },
];

export default function Navbar() {
  const location = useActiveVkuiLocation();
  const navigator = useRouteNavigator();

  return (
    <Tabbar>
      {tabbars.map((item) => (
        <TabbarItem
          key={item.view.id}
          text={item.text}
          selected={location.view == item.view.id}
          onClick={() => navigator.push(item.view.default)}
        >
          {item.icon}
        </TabbarItem>
      ))}
    </Tabbar>
  );
}
