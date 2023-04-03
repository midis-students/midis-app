import {
  Card,
  Div,
  Group,
  Header,
  Panel,
  PanelHeader,
  RichCell,
  Separator,
  View,
  Text,
  Title,
} from '@vkontakte/vkui';
import { useLocation } from '@happysanta/router';
import { Panels } from '@/router';
import { ScheduleList } from '@/views/Schedule/local-schedule';
import { Lesson, LessonDay } from '@/lib/api';
import cn from 'classnames';
import './lesson.css';

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

function ViewLesson({ lesson }: { lesson: Lesson }) {
  const isActive = lesson.id === 1;
  const isNext = lesson.id === 2;
  const isDanger = lesson.danger;

  return (
    <RichCell
      text={lesson.teacher}
      after={lesson.cabinet}
      className={cn('lesson', {
        lesson__current: isActive,
        lesson__next: isNext,
        lesson__danger: isDanger,
      })}
    >
      <Text>{lesson.object}</Text>
    </RichCell>
  );
}
