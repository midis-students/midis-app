import { ApiInfo, Profile } from './api.types';
import { ApiError, ApiSchedule, MidisSchedule, MidisDay, MidisLesson, ApiMarks } from './api.types';
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
      const { data, headers } = await axios.get(this.baseURL + 'test', {
        headers: {
          Authorization: token,
        },
      });
      if (headers['x-update']) {
        setRecoil(TokenAtom, headers['x-update']);
        localStorage.setItem('token', headers['x-update']);
        console.log('Updating token...');
        return true;
      }
      if (data.ok) return true;
    }
    setRecoil(TokenAtom, null);
    localStorage.removeItem('token');
    return false;
  }

  static async profile(): Promise<Profile> {
    const { data } = await axios.get<Profile>(this.baseURL + 'profile', {
      headers: {
        Authorization: this.token,
      },
    });

    return data;
  }

  static transformSchedule(data: ApiSchedule) {
    const result: Record<string, Schedule> = {};

    Object.entries(data).forEach(([group, schedule]) => {
      result[group] = new Schedule(group, schedule.weeks);
    });

    return result;
  }

  static async schedule() {
    const { data } = await axios.get<ApiSchedule>(this.baseURL + 'schedule', {
      headers: {
        Authorization: this.token,
      },
    });

    return data;
  }

  static async daily(): Promise<ApiMarks> {
    const { data } = await axios.get(this.baseURL + 'daily', {
      headers: { Authorization: this.token },
    });

    return data;
  }

  static async info(): Promise<ApiInfo> {
    const { data } = await axios.get(this.baseURL + 'info');

    return data;
  }

  static async websocket(): Promise<string> {
    const { data } = await axios.get(this.baseURL + 'ws', {
      headers: { Authorization: this.token },
    });

    return data.url;
  }

  static async obsidian(path: string = '') {
    const { data, headers } = await axios.get(this.baseURL + 'obsidian/' + path);
    if (headers['content-type'].startsWith('application/json')) {
      return { data, raw: false };
    }
    return { data, raw: true };
  }

  static getCache<T>(key: string, force: boolean = false): T | null {
    const time = localStorage.getItem(key + '-t');
    if (time) {
      if (force || Date.now() - Number(time) >= 1000 * 60 * 5) {
        const item = localStorage.getItem(key);
        if (item) {
          return JSON.parse(item);
        }
      } else {
        localStorage.removeItem(key + '-t');
        localStorage.removeItem(key);
      }
    }
    return null;
  }

  static getCacheTime(key: string) {
    return (Date.now() - Number(localStorage.getItem(key + '-t'))) / 1000;
  }

  static setCache(key: string, item: Record<string, any>) {
    localStorage.setItem(key, JSON.stringify(item));
    localStorage.setItem(key + '-t', Date.now().toString());
  }
}

export class Schedule {
  groupName: string;
  data: MidisSchedule & {
    firstWeek: MidisDayExtra[];
    secondWeek: MidisDayExtra[];
  };

  constructor(groupName: string, data: MidisSchedule) {
    this.groupName = groupName;
    this.data = data as typeof this.data;
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
    return new MidisDayExtra(day);
  }
  private getDaySchedule(day: MidisDay, id: number) {
    return schedule_time[day.dayName.includes('Суббота') ? 'saturday' : 'weekdays'][id - 1];
  }
}

export class MidisDayExtra implements MidisDay {
  dayName!: string;
  dayTimetable!: string;
  dayPars!: MidisLesson[];
  isSaturday!: boolean;

  constructor(day: MidisDay) {
    Object.assign(this, day);
    this.dayName = day.dayName.replace('(Сегодня)', '').replace('(Завтра)', '');
    this.isSaturday = day.dayName.includes('Суббота');
    this.dayPars = day.dayPars.map(
      (lesson): MidisLesson => ({
        ...lesson,
        time: getScheduleTime(lesson.id, this.isSaturday, true) as MidisLesson['time'],
      }),
    );
  }

  getCurrently() {
    const time = Date.now();

    const startSchedule = getScheduleTime(this.dayPars[0].id, this.isSaturday);
    if (time < startSchedule.start) {
      return 0;
    }

    for (let i = 0; i < this.dayPars.length; i++) {
      const schedule = getScheduleTime(this.dayPars[i].id, this.isSaturday);
      if (schedule.end >= time && schedule.start <= time) {
        return this.dayPars[i].id;
      }
    }

    return -1;
  }
}

export function FormatTime(seconds: number) {
  return {
    hours: Math.trunc(seconds / 3600),
    mins: Math.trunc((seconds % 3600) / 60),
    secs: Math.trunc((seconds % 3600) % 60),
  };
}

export function getTime(day: MidisDay) {
  /// TODO Переделать
  const now = new Date();

  var current = 0;

  for (var i = 1; i < day.dayPars.length; i++) {
    const time = day.dayPars[i].time;
    const start = time.start.split(':').map((value) => Number(value));
    const startTime = new Date();
    startTime.setHours(start[0]);
    startTime.setMinutes(start[1]);
    startTime.setSeconds(0);
    const end = time.end.split(':').map((value) => Number(value));
    const endTime = new Date();
    endTime.setHours(end[0]);
    endTime.setMinutes(end[1]);
    endTime.setSeconds(0);

    current = i - 1;

    if (startTime >= now) {
      //pre End time
      var preEnd = day.dayPars[i - 1].time.end.split(':').map((value) => Number(value));
      const preEndTime = new Date();
      preEndTime.setHours(preEnd[0]);
      preEndTime.setMinutes(preEnd[1]);
      preEndTime.setSeconds(0);

      var outdate = new Date(preEndTime.getTime() - now.getTime());

      var preHours = preEndTime.getHours() - now.getHours() - 1,
        preMinutes = outdate.getMinutes().toString().padStart(2, '0'),
        preSeconds = outdate.getSeconds().toString().padStart(2, '0');

      return {
        current: current,
        time: `${(preHours ? preHours + ':' : '') + preMinutes}:${preSeconds}`,
      };
    }
  }

  return {
    current: 0,
    time: `Перемена`,
  };
}

function getScheduleTime(schedule_index: number, isSaturday: boolean, raw = false) {
  const time = schedule_time[isSaturday ? 'saturday' : 'weekdays'][schedule_index];
  if (raw) {
    return time;
  }

  const getTime = (time: string) => {
    const [hours, minutes] = time.split(':').map((value) => Number(value));
    return {
      hours,
      minutes,
    };
  };

  const start = new Date();
  start.setHours(getTime(time.start).hours);
  start.setMinutes(getTime(time.end).minutes);
  start.setSeconds(0);
  start.setMilliseconds(0);
  const end = new Date();
  end.setHours(getTime(time.end).hours);
  end.setMinutes(getTime(time.end).minutes);
  end.setSeconds(0);
  end.setMilliseconds(0);

  return {
    start: start.getTime(),
    end: end.getTime(),
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
    { start: '08:00', end: '09:35' },
    { start: '09:45', end: '11:20' },
    { start: '11:30', end: '13:05' },
    { start: '13:15', end: '14:50' },
    { start: '15:00', end: '16:35' },
    { start: '16:45', end: '18:20' },
    { start: '18:30', end: '20:05' },
  ],
};
