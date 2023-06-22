import { FC } from 'react';

import { ViewRoute } from '@/components/ViewRoute';
import { routes } from '@/router';
import { PanelGrades } from '@/views/Journal/grades';

type ViewProps = {
  nav: string;
};

export const JournalView: FC<ViewProps> = (props) => {
  const view = routes.root.journal;

  return (
    <ViewRoute nav={props.nav} defaultPanel={view.default.id}>
      <PanelGrades nav={view.default.id} />
    </ViewRoute>
  );
};
