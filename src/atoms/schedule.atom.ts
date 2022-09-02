import { Api } from './../lib/api';
import { TokenAtom } from './token.atom';
import { selector } from 'recoil';

export const ScheduleAtom = selector({
  key: 'schedule.atom',
  get: async () => {
    const schedule = await Api.schedule();
    return schedule['Группа П-38'];
  },
});
