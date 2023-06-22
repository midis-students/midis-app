import type { ReactNode } from 'react';
import {
  useFirstPageCheck,
  useRouteNavigator,
} from '@vkontakte/vk-mini-apps-router';
import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

type PageProps = {
  nav: string;
  children: ReactNode;
  onClose?: () => void;
  title?: string;
};

export function Page(props: PageProps) {
  const isFirstPage = useFirstPageCheck();
  const routeNavigator = useRouteNavigator();

  const defaultOnClose = () =>
    isFirstPage ? routeNavigator.push('/') : routeNavigator.back();

  const onClose = props.onClose ?? defaultOnClose;

  const title = props.title ?? 'МИДиС Мини';

  return (
    <Panel id={props.nav}>
      <PanelHeader before={<PanelHeaderBack onClick={onClose} />}>
        {title}
      </PanelHeader>
      {props.children}
    </Panel>
  );
}
