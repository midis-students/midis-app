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
    const profile = this.getCache<Profile>('profile');
    if (profile) {
      return profile;
    }
    const { data } = await axios
      .get<Profile>(this.baseURL + 'profile', {
        headers: {
          Authorization: this.token,
        },
      })
      .catch((e) => {
        console.error(e);
        return {
          data: this.getCache('profile', true) as Profile,
        };
      });

    this.setCache('profile', data);

    return data;
  }

  static async schedule(): Promise<Record<string, Schedule>> {
    const schedule = this.getCache<Record<string, Schedule>>('schedule');
    if (schedule) {
      const result: Record<string, Schedule> = {};
      Object.entries(schedule).forEach(([group, schedule]) => {
        result[group] = new Schedule(group, {
          firstWeek: schedule.data.firstWeek,
          secondWeek: schedule.data.secondWeek,
        });
      });
      return result;
    }
    const { data, cachedData } = await axios
      .get<ApiSchedule>(this.baseURL + 'schedule', {
        headers: {
          Authorization: this.token,
        },
      })
      .then(({ data }) => {
        return {
          data,
          cachedData: undefined,
        };
      })
      .catch((e) => {
        console.error(e);
        return {
          cachedData: this.getCache('schedule', true) as Record<string, Schedule>,
          data: undefined,
        };
      });

    if (cachedData) {
      const result: Record<string, Schedule> = {};
      Object.entries(cachedData).forEach(([group, schedule]) => {
        result[group] = new Schedule(group, {
          firstWeek: schedule.data.firstWeek,
          secondWeek: schedule.data.secondWeek,
        });
      });
      return result;
    }

    const result: Record<string, Schedule> = {};

    Object.entries(data).forEach(([group, schedule]) => {
      result[group] = new Schedule(group, schedule.weeks);
    });

    this.setCache('schedule', result);

    return result;
  }

  static async daily(): Promise<ApiMarks> {
    const daily = this.getCache<ApiMarks>('daily');
    if (daily) {
      return daily;
    }
    const { data } = await axios
      .get(this.baseURL + 'daily', {
        headers: { Authorization: this.token },
      })
      .catch((e) => {
        console.error(e);
        return {
          data: this.getCache('daily', true),
        };
      });

    this.setCache('daily', data);

    return data;
  }

  static async info(): Promise<ApiInfo> {
    const cached = this.getCache<ApiInfo>('info');
    if (cached) {
      return cached;
    }

    const { data } = await axios.get(this.baseURL + 'info').catch((e) => {
      console.error(e);
      return {
        data: this.getCache('info', true),
      };
    });

    this.setCache('info', data);

    return data;
  }

  static async websocket(): Promise<string> {
    const { data } = await axios.get(this.baseURL + 'ws', {
      headers: { Authorization: this.token },
    });

    return data.url;
  }

  private static getCache<T>(key: string, force: boolean = false): T | null {
    const time = localStorage.getItem(key + '-t');
    if (time) {
      if (force || Date.now() - Number(time) >= 1000 * 60 * 5) {
        const item = localStorage.getItem(key);
        if (item) {
          return JSON.parse(item);
        }
      }
    }
    return null;
  }

  private static setCache(key: string, item: Record<string, any>) {
    localStorage.setItem(key, JSON.stringify(item));
    localStorage.setItem(key + '-t', Date.now().toString());
  }
}

export class Schedule {
  groupName: string;
  data: MidisSchedule;
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
