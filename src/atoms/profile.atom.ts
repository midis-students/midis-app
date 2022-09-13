import { Api } from './../lib/api';
import { selector } from 'recoil';
import { Profile } from '../lib/api.types';

export const ProfileAtom = selector({
  key: 'profile.atom',
  get: async () => {
    const cache = Api.getCache<Profile>('proflie');
    if (cache) {
      return cache;
    }

    const data = await Api.profile();

    Api.setCache('profile', data);

    return data;
  },
});
