import { FC } from 'react';

import { ViewRoute } from '@/components/ViewRoute';
import { routes } from '@/router';

import { PanelScheduleShort } from './ScheduleShort';

type ViewProps = {
  nav: string;
};

export const ScheduleView: FC<ViewProps> = (props) => {
  return (
    <ViewRoute nav={props.nav} defaultPanel={routes.root.schedule.default.id}>
      <PanelScheduleShort nav={routes.root.schedule.default.id} />
    </ViewRoute>
  );
};
