import { Api } from './../lib/api';
import { selector } from 'recoil';
import { ApiInfo } from '../lib/api.types';

export const InfoAtom = selector({
  key: 'info.atom',
  get: async () => {
    return Api.execute<ApiInfo>('info', Api.info);
  },
});
