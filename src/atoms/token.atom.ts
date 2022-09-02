import { atom } from 'recoil';

export const TokenAtom = atom<string | null>({
  key: 'atom.token',
  default: localStorage.getItem('token'),
});
