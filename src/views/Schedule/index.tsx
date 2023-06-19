import { FC } from 'react';

import { ViewRoute } from '@/components/ViewRoute';
import { VIEW_SCHEDULE_PANELS } from '@/router';

import { PanelScheduleShort } from './ScheduleShort';

type ViewProps = {
  nav: string;
};

export const ScheduleView: FC<ViewProps> = (props) => {
  return (
    <ViewRoute nav={props.nav} defaultPanel={VIEW_SCHEDULE_PANELS.Default}>
      <PanelScheduleShort nav={VIEW_SCHEDULE_PANELS.Default} />
    </ViewRoute>
  );
};
