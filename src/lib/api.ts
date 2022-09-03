import { ApiError, ApiSchedule, MidisSchedule, MidisDay, MidisLesson } from './api.d';
import { TokenAtom } from './../atoms/token.atom';
import { getRecoil, setRecoil } from 'recoil-nexus';
import axios from 'axios';

export class Api {
  static readonly baseURL = 'https://api.iky.su/v14/';
  private static token = localStorage.getItem('token') || '';

  static async login(login: string, password: string) {
    try {
      const { data } = await axios.post(this.baseURL + 'auth', { login, password });
      if ('token' in data) {
        localStorage.setItem('token', data.token);
        setRecoil(TokenAtom, data.token);
        this.token = data.token;
        return data.token as string;
      } else {
        return data.error as ApiError;
      }
    } catch (e) {
      return e as ApiError;
    }
  }

  static async test() {
    const token = getRecoil(TokenAtom);
    if (token) {
      const { data } = await axios.get(this.baseURL + 'test', {
        headers: {
          Authorization: token,
        },
      });

      return data.ok;
    }
    setRecoil(TokenAtom, null);
    localStorage.removeItem('token');
    return false;
  }

  static async schedule() {
    const { data } = await axios.get<ApiSchedule>(this.baseURL + 'schedule', {
      headers: {
        Authorization: this.token,
      },
    });

    const result: Record<string, Schedule> = {};

    Object.entries(data).forEach(([group, schedule]) => {
      result[group] = new Schedule(group, schedule.weeks);
    });
    return result;
  }
}

export class Schedule {
  groupName: string;
  private data: MidisSchedule;
  constructor(groupName: string, data: MidisSchedule) {
    this.groupName = groupName;
    this.data = data;
    this.data.firstWeek = this.data.firstWeek.map((day) => this.getDayExtra(day));
    this.data.secondWeek = this.data.secondWeek.map((day) => this.getDayExtra(day));
  }

  getDay(date: string | Date) {
    if (typeof date === 'object') {
      date = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}`;
    }
    for (const day of this.getAllDays()) {
      if (day.dayName.includes(date)) {
        return day;
      }
    }
  }
  getToday() {
    return this.getDay(new Date());
  }
  getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return this.getDay(tomorrow);
  }

  getAllDays() {
    return [...this.data.firstWeek, ...this.data.secondWeek];
  }
  private getDayExtra(day: MidisDay) {
    return {
      ...day,
      dayName: day.dayName.replace('(Сегодня)', '').replace('(Завтра)', ''),
      dayPars: day.dayPars.map(
        (lesson): MidisLesson => ({
          ...lesson,
          time: this.getDaySchedule(day, lesson.id),
        }),
      ),
    };
  }
  private getDaySchedule(day: MidisDay, id: number) {
    return schedule_time[day.dayName.includes('Суббота') ? 'saturday' : 'weekdays'][id - 1];
  }
}

export function getTime(day: MidisDay) {
  const now = new Date();
  const temp = new Date();
  temp.setSeconds(0);

  let i = 0;

  const format = (seconds: number) => {
    seconds /= 1000;
    return {
      hours: Math.floor(seconds / 3600)
        .toString()
        .padStart(2, '0'),
      minutes: Math.floor((seconds % 3600) / 60)
        .toString()
        .padStart(2, '0'),
      seconds: Math.floor((seconds % 3600) % 60)
        .toString()
        .padStart(2, '0'),
    };
  };

  for (const par of day.dayPars) {
    const time = par.time;
    const start = time.start.split(':').map((value) => Number(value));
    const end = time.end.split(':').map((value) => Number(value));
    temp.setHours(start[0]);
    temp.setMinutes(start[1]);

    if (temp.getTime() - now.getTime() >= 0) {
      const { hours, minutes, seconds } = format(temp.getTime() - now.getTime());

      return {
        current: i,
        time: +hours > 0 ? `${hours}:${minutes}` : `${minutes}:${seconds}`,
      };
    }

    i++;
  }
  const { hours, minutes, seconds } = format(temp.getTime() - now.getTime());
  return {
    current: i,
    time: +hours > 0 ? `${hours}:${minutes}` : `${minutes}:${seconds}`,
  };
}

export const schedule_time = {
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
    { start: '8:00', end: '09:35' },
    { start: '09:45', end: '11:20' },
    { start: '11:30', end: '13:05' },
    { start: '13:15', end: '14:50' },
    { start: '15:00', end: '16:35' },
    { start: '16:45', end: '18:20' },
    { start: '18:30', end: '20:05' },
  ],
};
