export const VERSION =
  document.getElementsByTagName('html')[0].getAttribute('version') || 'Dev';

export const IS_DEV = import.meta.env.DEV;
export const IS_LOCALHOST = location.origin.includes('localhost');

export const IS_TECH_WORK = false;
