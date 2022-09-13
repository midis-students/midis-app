import { Api } from './../lib/api';
import { selector } from 'recoil';

export const InfoAtom = selector({
  key: 'info.atom',
  get: async () => {
    const cache = Api.getCache('info');
    if (cache) {
      return cache;
    }

    const data = await Api.info();

    Api.setCache('info', data);

    return data;
  },
});
