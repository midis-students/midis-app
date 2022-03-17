import { authState } from './Profile';
import { APIDay } from './../lib/midis-api.types';
import { getAbsence } from './../lib/midis-api';
import { getSchedule } from '../lib/midis-api';
import { IError } from '../lib/midis-api.types';
import { optomizer, scheduleTransform } from '../lib/parser';
import { PAGE_AUTH, router } from '../router';
import { connectedAtom, connectedSelector } from './ConnectedStore';

export const AppErrorState = connectedAtom({
  key: 'AppErrorState',
  default: null as null | IError,
});

export const AppScheduleState = connectedSelector({
  key: 'AppScheduleState',
  get: async ({ get }) => {
    get(authState);
    const response = await getSchedule();
    if (response.data) {
      const schedule_time = {
        weekdays: [
          { start: '8:30', end: '10:05' },
          { start: '10:15', end: '11:50' },
          { start: '12:00', end: '13:35' },
          { start: '14:15', end: '15:50' },
          { start: '16:00', end: '17:35' },
          { start: '17:55', end: '19:30' },
          { start: '19:40', end: '21:15' },
        ],
        saturday: [
          { start: '8:30', end: '10:05' },
          { start: '10:15', end: '11:50' },
          { start: '12:00', end: '13:35' },
          { start: '13:45', end: '15:20' },
          { start: '15:30', end: '17:05' },
          { start: '17:15', end: '18:50' },
          { start: '19:00', end: '20:35' },
        ],
      };
      const schedule = scheduleTransform(optomizer(response.data));
      schedule.groups.forEach((group_name) => {
        const group = schedule.group(group_name);
        const settime = (day: APIDay) => {
          day.pars.forEach((par, index: number) => {
            par.time = schedule_time[day.name.includes('Суббота') ? 'saturday' : 'weekdays'][index];
          });
        };
        if (group.next_day) settime(group.next_day);
        if (group.now_day) settime(group.now_day);
        group.weeks.forEach((week) => week.days.forEach((day) => settime(day)));
      });
      return schedule;
    }
    router.pushPage(PAGE_AUTH);
  },
  set: () => {},
});

export const AppMarksState = connectedSelector({
  key: 'AppMarksState',
  get: async ({ get }) => {
    get(authState);
    const response = await getAbsence();
    if (response.data) {
      return response.data;
    }
    router.pushPage(PAGE_AUTH);
  },
  set: () => {},
});
