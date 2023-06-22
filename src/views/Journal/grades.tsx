import { FC } from 'react';
import { Group } from '@vkontakte/vkui';

import { Page } from '@/components/Page';

type PanelProps = {
  nav: string;
};

export const PanelGrades: FC<PanelProps> = (props) => {
  return (
    <Page nav={props.nav} title={'Оценки'}>
      <Group>Оценки...</Group>
    </Page>
  );
};
