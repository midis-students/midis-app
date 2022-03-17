import { PAGE_AUTH, router } from './../router';
import { AppErrorState } from './../atoms/App';

import axios from 'axios';
import { updateConnectedValue } from '../atoms/ConnectedStore';

declare global {
  interface Window {
    isDevHost: boolean;
    token: string;
  }
}

const VK_PARAMS = {
  vk_access_token_settings: '',
  vk_app_id: 7800945,
  vk_are_notifications_enabled: 0,
  vk_is_app_user: 1,
  vk_is_favorite: 0,
  vk_language: 'ru',
  vk_platform: 'dev',
  vk_ref: 'other',
  vk_ts: Date.now(),
  vk_user_id: '233938082',
};

function serialize(obj: Record<string, any>) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return '?' + str.join('&');
}

const endpoint = 'https://dev.iky.su';

export async function request<T>(
  method: string,
  body: Record<string, any> = {},
  headers: Record<string, any> = {},
): Promise<T> {
  const q =
    window.location.href +
    (window.isDevHost ? serialize(VK_PARAMS) : '') +
    '&agent=' +
    window.navigator.userAgent;
  const Authorization = window.token || localStorage.getItem('token');

  if (headers?.Authorization == undefined && Authorization != undefined) {
    headers.Authorization = Authorization;
  }

  const { data } = await axios.post(endpoint + method, { q, ...body }, { headers }).catch((e) => ({
    data: {
      error: `${e} when request: ${method} with body ${JSON.stringify(body)}`,
      longmessage: e.longmessage as string,
    },
  }));

  if (data?.error) {
    const whitelist = ['USER NOT FOUND', 'AUTH HEADER NOT FOUND', 'BAD Q'];
    if (!whitelist.includes(data.error.message)) {
      updateConnectedValue(AppErrorState, {
        message: data.error.message,
        longmessage: data.error.longmessage,
      });
    } else {
      router.pushPage(PAGE_AUTH);
    }
  }

  return data;
}
