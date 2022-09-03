import { Api } from './../lib/api';
import { selector } from 'recoil';

export const MarksAtom = selector({
  key: 'marks.atom',
  get: async () => {
    return await Api.daily();
  },
});
