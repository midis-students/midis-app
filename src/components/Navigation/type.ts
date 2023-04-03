import { ReactNode } from 'react';
import { Page } from '@happysanta/router';

export type NavigationItem = {
  id: string;
  label: string;
  icon: ReactNode;
  page: Page;
};
