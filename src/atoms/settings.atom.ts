import { atom } from 'recoil';
export const SettingsAtom = atom({
  key: 'settings.atom',
  default: {
    cacheTime: 15, /// Minutes,
    showAlt: true,
  },
});
