import { useRecoilValue } from 'recoil';
import { ScheduleAtom } from '../../../../atoms/schedule.atom';
import View from '../../../../components/View';
import { MidisDay } from '../../../../lib/api.d';

import style from './style.module.scss';

export default function TableView() {
  const schedule = useRecoilValue(ScheduleAtom);

  const today = schedule.getToday();
  const tomorrow = schedule.getTomorrow();

  return (
    <View>
      <DayRender day={today} tomorrow={false} />
      <DayRender day={tomorrow} tomorrow={true} />
    </View>
  );
}

interface DayRenderProps {
  day: MidisDay;
  tomorrow: boolean;
}

function DayRender({ day, tomorrow }: DayRenderProps) {
  const current = 0;
  const showAlt = true;
  return (
    <>
      <h2 className={style.head}>
        {tomorrow ? 'Завтра' : 'Сегодня'}
        <span>{day.dayName}</span>
      </h2>
      <ul className={style.list}>
        {day.dayPars.map((par, i) => (
          <li key={par.id} className={style[`row-${i + 1}`]}>
            <span>{par.class}</span>
            <span className={style['schedule-time']}>
              <div>{par.time.start}</div>
              <div>{par.time.end}</div>
            </span>
            <div className={style.meta}>
              <span className={style.meta__object}>
                {showAlt ? ('altObject' in par ? par.altObject : par.object) : par.object}
              </span>
              <span className={style.meta__teacher}>{par.teacher}</span>
            </div>
            {!tomorrow && i === current && <div className={style.tag}>{}</div>}
            {!tomorrow && i - 1 === current && <div className={style.tag}>Далее</div>}
          </li>
        ))}
      </ul>
    </>
  );
}