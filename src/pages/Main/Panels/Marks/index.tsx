import { useRecoilValue } from 'recoil';
import { MarksAtom } from '../../../../atoms/marks.atom';
import { Colors } from '../../../../components/Colors';
import View from '../../../../components/View';
import { Mark } from '../../../../lib/api.types';

import style from './style.module.scss';

type MarkExt = Mark & { object: string };

export default function MarksView() {
  const marks = useRecoilValue(MarksAtom);

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
      const [date, month, yaer] = value.split(' ')[1].split('.').map(Number);
      const _date = new Date();
      _date.setDate(date);
      _date.setMonth(month);
      _date.setFullYear(yaer);
      return _date.getTime();
    };
    return getTime(next.date) - getTime(prev.date);
  });

  console.log(transformed);

  return (
    <View>
      <h1>Оценки</h1>
      <ul className={style['marks-list']}>
        {transformed.map((value) => (
          <MarkView key={`${value.object}`} mark={value} />
        ))}
      </ul>
    </View>
  );
}

function MarkView({ mark }: { mark: MarkExt }) {
  const markColor = (value: number) => {
    switch (value) {
      case 5:
        return '#1ebf6b';
      case 4:
        return '#fb8231';
      case 3:
        return '#f5b042';

      default:
        return '#eb3a5a';
    }
  };

  return (
    <li key={mark.date + mark.details} className={style['mark-container']}>
      <div className={style['mark-info']}>
        <span>{mark.object}</span>
        <span>{mark.details}</span>
        <span className={style['mark-date']}>{mark.date}</span>
      </div>
      <span className={style.mark} style={{ backgroundColor: markColor(+mark.mark) }}>
        {mark.mark}
      </span>
    </li>
  );
}
