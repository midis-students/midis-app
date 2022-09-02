import style from './style.module.scss';

interface TabsProps {
  children: React.ReactNode;
}

export default function Tabs(props: TabsProps) {
  return <div className={style.tabs}>{props.children}</div>;
}

interface TabProps {
  children: React.ReactNode;
  icon: string;
  active: number;
  id: number;
  onClick: (id: number) => void;
}

export function Tab(props: TabProps) {
  return (
    <button className={style.tab} onClick={() => props.onClick(props.id)}>
      <img src={props.icon} className={props.active === props.id ? style.active : ''} />
      {props.children}
    </button>
  );
}
