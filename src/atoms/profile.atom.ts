import { Api } from './../lib/api';
import { selector } from 'recoil';

export const ProfileAtom = selector({
  key: 'profile.atom',
  get: async () => {
    return await Api.profile();
  },
});
