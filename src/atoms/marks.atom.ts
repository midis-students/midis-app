import { Api } from './../lib/api';
import { selector } from 'recoil';
import { ApiMarks } from '../lib/api.types';

export const MarksAtom = selector({
  key: 'marks.atom',
  get: async () => {
    return Api.execute<ApiMarks>('daily', Api.daily);
  },
});
