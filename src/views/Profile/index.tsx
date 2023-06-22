import { FC } from 'react';

import { ViewRoute } from '@/components/ViewRoute';
import { routes } from '@/router';
import { PanelProfile } from '@/views/Profile/profile';

type ViewProps = {
  nav: string;
};

export const ProfileView: FC<ViewProps> = (props) => {
  const view = routes.root.profile;

  return (
    <ViewRoute nav={props.nav} defaultPanel={view.default.id}>
      <PanelProfile nav={view.default.id} />
    </ViewRoute>
  );
};
