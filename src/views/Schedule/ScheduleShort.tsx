import { FC } from 'react';
import { Header } from '@vkontakte/vkui';

import { CardList } from '@/components/CardList';
import { Page } from '@/components/Page';
import { ScheduleTime } from '@/config/schedule';
import { ScheduleList } from '@/lib/data';
import { LessonDay } from '@/lib/types';

import { LessonCell } from './LessonCell';

type PanelProps = {
  nav: string;
};

export const PanelScheduleShort: FC<PanelProps> = (props) => {
  return (
    <Page nav={props.nav} title={'Расписание'}>
      {ScheduleList.map((day) => (
        <DayBlock key={day.date} day={day} />
      ))}
    </Page>
  );
};

const DayBlock: FC<{ day: LessonDay }> = ({ day }) => {
  const isSaturday = day.date.toLowerCase().includes('суббота');
  const time_table = ScheduleTime[isSaturday ? 'saturday' : 'weekdays'];

  const formatTime = ({ start, end }: { start: string; end: string }) =>
    start + '-' + end;

  return (
    <CardList
      header={<Header style={{ margin: '.5rem 0' }}>{day.date}</Header>}
    >
      {day.lessons.map((lesson) => (
        <LessonCell
          key={lesson.id + '-' + lesson.object}
          lesson={lesson}
          time={formatTime(time_table[lesson.id])}
        />
      ))}
    </CardList>
  );
};
