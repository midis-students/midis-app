import React from 'react';
import Tabbar from './components/Tabbar';
import '@vkontakte/vkui/dist/vkui.css';
import { Alert, AppRoot, Epic, View } from '@vkontakte/vkui';
import { useLocation, useRouter } from '@happysanta/router';

import * as Routes from './router';
import TablePage from './pages/Table';
import MarksPage from './pages/Marks';
import ProfilePage from './pages/Profile';
import AuthPage from './pages/Auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ProfileState } from './atoms/Profile';
import bridge from '@vkontakte/vk-bridge';
import { AppErrorState, AppMarksState, AppScheduleState } from './atoms/App';

const Views: Record<string, typeof MarksPage> = {
  MARKS: MarksPage,
  TABLE: TablePage,
  PROFILE: ProfilePage,
  AUTH: AuthPage,
};

export function App() {
  const location = useLocation();
  const router = useRouter();
  const [errorPoput, setErrorPoput] = React.useState<JSX.Element>();
  const [ApiError] = useRecoilState(AppErrorState);

  useRecoilValue(ProfileState);
  useRecoilValue(AppScheduleState);
  useRecoilValue(AppMarksState);

  React.useEffect(() => {
    if (ApiError && ApiError.message !== 'BAD AUTH HEADER') {
      console.log(ApiError);
      setErrorPoput(
        <Alert
          actions={[{ title: 'Ладно', autoclose: true, mode: 'cancel' }]}
          onClose={() => {
            router.popPage();
            setErrorPoput(undefined);
          }}>
          <h2>{ApiError.message || 'Ой...'}</h2>
          <p>{ApiError.longmessage || 'Сервер не отвечает'}</p>
          {ApiError.message === undefined ? <img src="/im-down.webp" width="320em" /> : null}
        </Alert>,
      );
    }
  }, [ApiError]);

  React.useEffect(() => {
    async function Load() {
      bridge.send('VKWebAppInit').then(() => {
        window.isDevHost = true;
      });
    }
    Load();
  }, []);

  return (
    <AppRoot>
      <Epic
        activeStory={location.getViewId()}
        tabbar={location.getViewId() === Routes.VIEW_AUTH ? null : <Tabbar />}>
        {Object.entries(Views).map(([key, Element]) => {
          const route = Routes as Record<string, any>;
          const view: string = route[`VIEW_${key}`];
          const panel: string = route[`PANEL_${key}`];

          return (
            <View
              key={key}
              id={view}
              popout={errorPoput}
              onSwipeBack={() => router.popPage()}
              history={location.hasOverlay() ? [] : location.getViewHistory(view)}
              activePanel={location.getViewActivePanel(view) as string}>
              <Element id={panel} />
            </View>
          );
        })}
      </Epic>
    </AppRoot>
  );
}
