import { lazy } from 'react';
import { Pages, resolvePage } from '@/router';
import Navigation from '@/components/Navigation';
import { PanelHeader, PanelSpinner } from '@vkontakte/vkui';
import {
  Icon28TablecellsOutline,
  Icon28UserOutline,
  Icon28Users3Outline,
} from '@vkontakte/icons';

function App() {
  const navbar = [
    {
      id: Pages.Profile,
      label: 'Профиль',
      icon: <Icon28UserOutline />,
      page: resolvePage(Pages.Profile),
      element: lazy(() => import('./views/Profile')),
    },
    {
      id: Pages.Schedule,
      label: 'Расписание',
      icon: <Icon28TablecellsOutline />,
      page: resolvePage(Pages.Schedule),
      element: lazy(() => import('./views/Schedule')),
    },
    {
      id: Pages.Students,
      label: 'Студенты',
      icon: <Icon28Users3Outline />,
      page: resolvePage(Pages.Students),
      element: lazy(() => import('./views/Students')),
    },
  ];

  return (
    <Navigation
      items={navbar}
      header={<PanelHeader>МИДиС Мини</PanelHeader>}
      fallback={<PanelSpinner style={{ height: '100%' }} />}
    >
      {navbar.map((nav) => (
        <nav.element key={nav.id} id={nav.page.viewId} />
      ))}
    </Navigation>
  );
}

export default App;
