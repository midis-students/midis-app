import { Api } from './../lib/api';
import { selector } from 'recoil';

export const InfoAtom = selector({
  key: 'info.atom',
  get: async () => {
    return await Api.info();
  },
});
