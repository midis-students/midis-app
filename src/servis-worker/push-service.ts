import { useRegisterSW } from 'virtual:pwa-register/react';
import { Api } from '../lib/api';
import { Mark } from '../lib/api.types';

const intervalMS = 30 * 1000;
type MarkExt = Mark & { object: string };
export default function PushService() {
  const updateServiceWorker = useRegisterSW({
    onRegistered(r) {
      const interval =
        r &&
        setInterval(() => {
          r.update();

          const enabled = Number(localStorage.getItem('notification'));
          if (enabled) {
            Api.daily().then((marks) => {
              const transformed: Array<MarkExt> = [];
              Object.entries(marks).forEach(([object, values]) => {
                values.forEach((value) => {
                  transformed.push({
                    object,
                    ...value,
                  });
                });
              });

              transformed.sort((prev, next) => {
                const getTime = (value: string) => {
                  const [date, month, year] = value.split(' ')[1].split('.').map(Number);
                  const _date = new Date();
                  _date.setDate(date);
                  _date.setMonth(month);
                  _date.setFullYear(year);
                  return _date.getTime();
                };

                return getTime(next.date) - getTime(prev.date);
              });
              const last = localStorage.getItem('last-daily') || '{}';
              if (JSON.stringify(transformed[0]) != last) {
                new Notification(transformed[0].object, {
                  body: 'Оценка ' + transformed[0].mark,
                });
                localStorage.setItem('last-daily', JSON.stringify(transformed[0]));
              }
            });
          }

          // new Notification('Новая оценка', {
          //   body: 'Англ язык',
          // });
        }, intervalMS);
      return () => {
        clearInterval(interval);
      };
    },
  });
  return null;
}
