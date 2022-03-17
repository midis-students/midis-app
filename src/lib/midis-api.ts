import { PAGE_TABLE, router } from './../router';

import { authState } from '../atoms/Profile';
import {
  APIAuth,
  APIOK,
  APIPing,
  APIUserAbsence,
  APIUserDaily,
  APIUserProfile,
  APIUserSchedule,
  APIUsersList,
} from './midis-api.types';
import { request } from './request';
import { updateConnectedValue } from '../atoms/ConnectedStore';

export const UserAuth = async (login: string, password: string) => {
  const result = await request<APIAuth>('/auth', {}, { Authorization: login + ':' + password });
  if (result.token) {
    window.token = result.token;
    localStorage.setItem('token', result.token);
    updateConnectedValue(authState, result.token);
    router.pushPage(PAGE_TABLE);
  }
  return result;
};

export const UserPreAuth = async (login?: string): Promise<APIUsersList[] | APIUserProfile> => {
  let result = await request<APIOK>('/preAuth', { login }, {});
  if (result instanceof Array) {
    return result;
  }
  ///@ts-ignore
  const token = result.token;
  window.token = token;
  localStorage.setItem('token', token);
  updateConnectedValue(authState, token);
  router.pushPage(PAGE_TABLE);
  return getProfile();
};

export const getProfile = () => request<APIUserProfile>('/profile');
export const PING = () => request<APIPing>('/');
export const getSchedule = () => request<APIUserSchedule>('/schedule');
export const getDaily = () => request<APIUserDaily>('/absence');
export const getAbsence = () => request<APIUserAbsence>('/daily');
