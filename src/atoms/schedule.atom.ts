import { Api } from './../lib/api';
import { selector } from 'recoil';
import { ApiSchedule } from '../lib/api.types';

export const ScheduleAtom = selector({
  key: 'schedule.atom',
  get: async () => {
    const group = 'Группа П-38';
    const data = await Api.execute<ApiSchedule>('schedule', Api.schedule);
    const groups = Api.transformSchedule(data);
    return groups[group];
  },
});
