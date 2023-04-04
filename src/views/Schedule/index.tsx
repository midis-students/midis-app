import {
  Card,
  Div,
  Group,
  Header,
  Panel,
  PanelHeader,
  RichCell,
  Separator,
  Text,
  Title,
  View,
} from '@vkontakte/vkui';
import { useLocation } from '@happysanta/router';
import { Panels } from '@/router';
import { ScheduleList } from '@/views/Schedule/local-schedule';
import { Lesson, LessonDay } from '@/lib/api';
import cn from 'classnames';
import './lesson.css';
import { memo } from 'react';
import {
  getCurrentLessons,
  getLessonState,
  getScheduleTime,
  LessonState,
} from '@/views/Schedule/time';

type ExampleProps = {
  id: string;
};

export default function ScheduleView(props: ExampleProps) {
  const location = useLocation();
  const activePanel = location.getPanelId();
  const schedule = ScheduleList;

  return (
    <View id={props.id} activePanel={activePanel}>
      <Panel id={Panels.Schedule}>
        <PanelHeader>Расписание П-38</PanelHeader>
        <Group
          header={
            <Header>
              <Title level="2">Первая неделя</Title>
            </Header>
          }
        >
          <Div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            {schedule.map((day) => (
              <ViewDay key={day.date} day={day} />
            ))}
          </Div>
        </Group>
      </Panel>
    </View>
  );
}

function ViewDay({ day }: { day: LessonDay }) {
  const isToday = day.date.toLowerCase().includes('(сегодня)');
  const { currentLesson, nextLesson } = getCurrentLessons(
    day.lessons,
    day.date
  );

  const ViewLesson = memo(({ lesson }: { lesson: Lesson }) => {
    const isActive = isToday && currentLesson === lesson.id;
    const isNext = isToday && nextLesson === lesson.id;
    const isDanger = lesson.danger;
    const time = getScheduleTime(lesson.id, day.date);
    const className = cn('lesson', {
      lesson__current: isActive,
      lesson__next: isNext,
      lesson__danger: isDanger,
    });

    return (
      <RichCell
        caption={lesson.teacher}
        after={lesson.cabinet}
        subhead={time.start + '-' + time.end}
        className={className}
      >
        <Text>{lesson.object}</Text>
      </RichCell>
    );
  });

  return (
    <Card>
      <Header>{day.date}</Header>
      <Separator />
      <Div>
        {day.lessons.map((lesson) => (
          <ViewLesson key={lesson.id} lesson={lesson} />
        ))}
      </Div>
    </Card>
  );
}
