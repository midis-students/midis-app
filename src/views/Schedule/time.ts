import { Lesson } from '@/lib/api';

type ScheduleTime = {
  start: string;
  end: string;
};

type ScheduleWeekTime = {
  weekdays: ScheduleTime[];
  saturday: ScheduleTime[];
};

export const schedule_time: ScheduleWeekTime = {
  weekdays: [
    { start: '08:00', end: '09:35' },
    { start: '09:45', end: '11:20' },
    { start: '11:30', end: '13:05' },
    { start: '13:45', end: '15:20' },
    { start: '15:30', end: '17:05' },
    { start: '17:15', end: '18:50' },
    { start: '18:55', end: '20:30' },
    { start: '20:35', end: '22:10' },
  ],
  saturday: [
    { start: '08:00', end: '09:35' },
    { start: '09:45', end: '11:20' },
    { start: '11:30', end: '13:05' },
    { start: '13:15', end: '14:50' },
    { start: '15:00', end: '16:35' },
    { start: '16:45', end: '18:20' },
    { start: '18:30', end: '20:05' },
  ],
};

export function getScheduleTime(index: number, day: string) {
  const isSaturday = day.toLowerCase().includes('суббота');
  const key = isSaturday ? 'saturday' : 'weekdays';
  return schedule_time[key][index - 1];
}

function resolveScheduleTime(schedule: ScheduleTime) {
  const getTime = (value: string) => {
    const [hours, minutes] = value.split(':').map((value) => Number(value));
    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);
    time.setSeconds(0);
    time.setMilliseconds(0);
    return time.getTime();
  };

  const start = getTime(schedule.start);
  const end = getTime(schedule.end);

  return {
    start,
    end,
  };
}

export enum LessonState {
  Current,
  Next,
  Passed,
}

export function getLessonState(lesson: number, day: string) {
  const schedule = getScheduleTime(lesson, day);
  const time = resolveScheduleTime(schedule);
  const currentTime = Date.now();

  if (currentTime < time.start) {
    return LessonState.Next;
  }

  if (currentTime >= time.start && currentTime < time.end) {
    return LessonState.Current;
  }

  return LessonState.Passed;
}

export function getCurrentLessons(lessons: Lesson[], day: string) {
  let currentLesson = -1;
  let nextLesson = -1;

  for (const lesson of lessons) {
    if (getLessonState(lesson.id, day) === LessonState.Current) {
      if (currentLesson === -1) currentLesson = lesson.id;
    }
    if (getLessonState(lesson.id, day) === LessonState.Next) {
      if (nextLesson === -1) nextLesson = lesson.id;
    }
  }

  return { currentLesson, nextLesson };
}
