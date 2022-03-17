/*
 ***********************
 !       WARNING!      !
 ?     LEGACY CODE     ?
 *   Made with iky.su  *
 ***********************
 */

import { APIPar, APIUserSchedule } from './midis-api.types';

export function optomizer(data: Record<any, any>): APIUserSchedule {
  var out = null;

  function looper(obj: any): any {
    if (typeof obj == 'object' && obj instanceof Object) {
      if (obj instanceof Array) {
        var array = [];
        for (let i = 0; i < obj.length; i++) array.push(looper(obj[i]));
        return array;
      } else {
        var tmp: Record<string, any> = {};
        Object.keys(obj).forEach((t: string) => {
          var key = looper(t);
          tmp[key] = looper(obj[t]);
        });
        return tmp;
      }
    } else {
      return data.o[obj];
    }
  }

  out = looper(data.d);
  return out;
}
interface IWeek {
  name: string;
  days: IDay[];
}
interface IDay {
  name: string;
  pars: APIPar[];
}
export interface IGroup {
  now_day: null | IDay;
  next_day: null | IDay;
  weeks: IWeek[];
}

export function scheduleTransform(sched: Record<any, any>) {
  return {
    group: (group_name: any) => {
      var out: IGroup = {
        now_day: null,
        next_day: null,
        weeks: [],
      };

      for (let i = 0; i < sched[group_name]._.length; i++) {
        var dayid =
          sched[group_name]._[i]._.indexOf('Сегодня') != -1
            ? 'now_day'
            : sched[group_name]._[i]._.indexOf('Завтра') != -1
            ? 'next_day'
            : null;
        if (dayid) {
          if (sched[group_name]._[i])
            ///@ts-ignore
            out[dayid] = {
              name: sched[group_name]._[i]._,
              pars: sched[group_name]._[i].$,
            };
        } else {
          console.log('DAYID error', dayid);
        }
      }

      for (let i = 0; i < sched[group_name].$.length; i++) {
        if (sched[group_name].$[i]) {
          var week: IWeek = {
            name: sched[group_name].$[i]._ == 0 ? 'Первая неделя' : 'Вторая неделя',
            days: [],
          };

          for (let t = 0; t < sched[group_name].$[i].$.length; t++) {
            week.days.push({
              name: sched[group_name].$[i].$[t]._,
              pars: sched[group_name].$[i].$[t].$,
            });
          }

          out.weeks.push(week);
        }
      }

      return out;
    },
    groups: Object.keys(sched),
  };
}
