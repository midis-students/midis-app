import React from 'react';
import { useRecoilValue } from 'recoil';
import { ScheduleAtom } from '../../../../atoms/schedule.atom';
import Div from '../../../../components/Div';
import View from '../../../../components/View';
import { Api, FormatTime, getTime, MidisDayExtra } from '../../../../lib/api';
import { MidisDay } from '../../../../lib/api.types';

import style from './style.module.scss';

export default function TableView() {
  const schedule = useRecoilValue(ScheduleAtom);
  const today = schedule.getToday();
  const tomorrow = schedule.getTomorrow();
  const [cacheTime, setCacheTime] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      const time = FormatTime(Api.getCacheTime('schedule'));
      setCacheTime(`${time.mins} минут назад`);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <View>
      <span className={style.cacheTime}>{cacheTime}</span>
      {today && <DayRender day={today} tomorrow={false} />}{' '}
      {tomorrow && <DayRender day={tomorrow} tomorrow={true} />}
    </View>
  );
}

interface DayRenderProps {
  day: MidisDayExtra;
  tomorrow: boolean;
}

function DayRender({ day, tomorrow }: DayRenderProps) {
  const [{ current, time }, setTime] = React.useState<ReturnType<typeof getTime>>({} as any);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime(day));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log('current', day.getCurrently());

  const showAlt = true;
  return (
    <div className={style.table}>
      <h2 className={style.head}>
        {tomorrow ? 'Завтра' : 'Сегодня'}
        <span>{day.dayName}</span>
      </h2>
      <ul className={style.list}>
        {day.dayPars.map((par, i) => (
          <li key={par.id} className={style[`row-${i + 1}`]}>
            <span className={style['schedule-class']}>{par.class}</span>
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
            {!tomorrow && i === current && <div className={style.tag}>{time}</div>}
            {!tomorrow && i - 1 === current && <div className={style.tag}>Далее</div>}
          </li>
        ))}
      </ul>
    </div>
  );
}
