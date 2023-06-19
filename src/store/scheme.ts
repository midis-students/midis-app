import bridge, { AppearanceType } from '@vkontakte/vk-bridge';
import { create } from 'zustand';

type SchemeState = {
  scheme: AppearanceType;
  switchScheme: (scheme: AppearanceType, needChange?: boolean) => void;
};

const lights = ['light', 'vkcom_light', 'client_light'];

export const useScheme = create<SchemeState>((set) => ({
  scheme: 'light',
  switchScheme(scheme, needChange = false) {
    let isLight = lights.includes(scheme);

    if (needChange) {
      isLight = !isLight;
    }

    scheme = isLight ? 'light' : 'dark';
    set({ scheme });

    const schemeAttribute = document.createAttribute('scheme');
    schemeAttribute.value = scheme;
    document.body.attributes.setNamedItem(schemeAttribute);

    if (bridge.isWebView()) {
      bridge
        .send('VKWebAppSetViewSettings', {
          status_bar_style: isLight ? 'light' : 'dark',
          action_bar_color: isLight ? '#FFF' : '#000',
        })
        .catch(console.error);
    }
  },
}));

bridge.subscribe(({ detail: { type, data } }) => {
  if (type === 'VKWebAppUpdateConfig' && 'scheme' in data) {
    useScheme.getState().switchScheme(data.scheme as AppearanceType);
  }
});
