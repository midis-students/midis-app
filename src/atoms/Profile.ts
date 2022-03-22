import { PAGE_AUTH, PAGE_TABLE } from './../router';
import { getProfile, UserPreAuth } from './../lib/midis-api';

import { router } from '../router';
import { connectedAtom, connectedSelector } from './ConnectedStore';
import { APIUserProfile, APIUsersList } from '../lib/midis-api.types';

export const authState = connectedAtom({
  key: 'authState',
  default: localStorage.getItem('token'),
});

export const __preAuthState = connectedAtom<string | undefined>({
  key: '__preauthstate',
  default: undefined,
});

export const PreAuthState = connectedSelector<APIUserProfile | APIUsersList[]>({
  key: 'PreAuthState',
  get: async ({ get }) => {
    return await UserPreAuth(get(__preAuthState));
  },
  set: () => {},
});

export const ProfileState = connectedSelector({
  key: 'ProfileState',
  get: async ({ get }) => {
    const token = get(authState);
    if (token) {
      router.pushPage(PAGE_TABLE);
      return await getProfile();
    }
    router.pushPage(PAGE_AUTH);
  },
  set: () => {},
});
