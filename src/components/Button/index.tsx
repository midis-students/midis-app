import style from './style.module.scss';

import { Colors } from '../Colors';
import { ButtonHTMLAttributes, CSSProperties } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: keyof typeof Colors;
}

export default function Button(props: ButtonProps) {
  const { variant, children, ...rest } = props;

  const properties = {
    '--color': `var(--${variant || 'primary'})`,
  } as CSSProperties;

  return (
    <button className={style.button} style={properties} {...rest}>
      {children}
    </button>
  );
}
