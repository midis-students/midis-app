import style from './style.module.scss';

interface DivProps {
  children: React.ReactNode;
  className?: string;
}

export default function Div(props: DivProps) {
  return <div className={[style.div, props.className].join(' ')}>{props.children}</div>;
}
