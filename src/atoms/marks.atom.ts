import { Api } from './../lib/api';
import { selector } from 'recoil';
import { ApiMarks } from '../lib/api.types';

export const MarksAtom = selector({
  key: 'marks.atom',
  get: async () => {
    const cache = Api.getCache<ApiMarks>('daily');
    if (cache) {
      return cache;
    }
    const data = await Api.daily();
    Api.setCache('daily', data);

    return data;
  },
});
