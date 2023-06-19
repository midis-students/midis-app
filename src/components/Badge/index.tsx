import { FC, ReactNode } from 'react';

import style from './badge.module.css';

type BadgeProps = {
  children: ReactNode;
};

export const Badge: FC<BadgeProps> = (props) => {
  return <div className={style.badge}>{props.children}</div>;
};
