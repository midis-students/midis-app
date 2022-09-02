import React from 'react';
import style from './style.module.scss';

interface ViewProps {
  children: React.ReactNode;
}

export default function View(props: ViewProps) {
  return <div className={style.view}>{props.children}</div>;
}
