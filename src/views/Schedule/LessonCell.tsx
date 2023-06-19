import { FC } from 'react';
import { RichCell, Subhead, Text } from '@vkontakte/vkui';

import { Badge } from '@/components/Badge';
import { Lesson } from '@/lib/types';

type LessonCellProps = {
  lesson: Lesson;
  time: string;
};

export const LessonCell: FC<LessonCellProps> = ({ lesson, time }) => {
  return (
    <RichCell
      after={
        <Text
          style={{ height: '2rem', color: 'var(--vkui--color_text_secondary)' }}
        >
          {time}
        </Text>
      }
      caption={lesson.teacher}
      text={lesson.object}
    >
      <Text
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '.75rem',
          height: '2rem',
          marginBottom: '1em',
        }}
      >
        <Subhead weight="1">1 пара</Subhead> <Badge>245 ауд</Badge>
      </Text>
    </RichCell>
  );
};
