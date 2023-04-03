import { LessonDay } from '@/lib/api';

export const ScheduleList: LessonDay[] = [
  {
    date: 'Вторник',
    lessons: [
      {
        id: 4,
        object: 'Учебная практика',
        cabinet: '249/251',
        flow: 'Все',
        teacher: 'Горанов',
      },
      {
        id: 5,
        object: 'Учебная практика',
        cabinet: '1',
        flow: 'Все',
        teacher: 'Горанов',
      },
    ],
  },
  {
    date: 'Среда',
    lessons: [
      {
        id: 1,
        object: 'Учебная практика',
        cabinet: '-',
        flow: 'Все',
        teacher: 'Прилепина',
      },
      {
        id: 2,
        object: 'Учебная практика',
        cabinet: '-',
        flow: 'Все',
        teacher: 'Прилепина',
      },
    ],
  },
  {
    date: 'Четверг - Консультации',
    lessons: [
      {
        id: 1,
        object: 'Учебная практика',
        cabinet: '249/251',
        flow: 'Все',
        teacher: '-',
        danger: true,
      },
      {
        id: 3,
        object: 'Учебная практика',
        cabinet: '249/251',
        flow: 'Все',
        teacher: 'Горанов',
      },
    ],
  },
  {
    date: 'Пятница',
    lessons: [
      {
        id: 1,
        object: 'Учебная практика',
        cabinet: '249/251',
        flow: 'Все',
        teacher: 'Горанов',
      },
      {
        id: 3,
        object: 'Учебная практика',
        cabinet: '249/251',
        flow: 'Все',
        teacher: 'Горанов',
      },
    ],
  },
];
