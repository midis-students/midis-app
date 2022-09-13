import { Api } from './../lib/api';
import { selector } from 'recoil';
import { ApiSchedule } from '../lib/api.types';

export const ScheduleAtom = selector({
  key: 'schedule.atom',
  get: async () => {
    const group = 'Группа П-38';
    const cache = Api.getCache<ApiSchedule>('schedule');
    if (cache) {
      const data = Api.transformSchedule(cache);
      return data[group];
    }
    const data = await Api.schedule();
    Api.setCache('schedule', data);
    const schedule = Api.transformSchedule(data);
    return schedule[group];
  },
});
