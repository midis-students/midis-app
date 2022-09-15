import { Api } from './../lib/api';
import { selector } from 'recoil';
import { Profile } from '../lib/api.types';

export const ProfileAtom = selector({
  key: 'profile.atom',
  get: async () => {
    return Api.execute<Profile>('profile', Api.profile);
  },
});
