import { useRecoilValue } from 'recoil';
import { MarksAtom } from '../../../../atoms/marks.atom';
import { Colors } from '../../../../components/Colors';
import View from '../../../../components/View';
import { Mark } from '../../../../lib/api.types';

import style from './style.module.scss';

export default function MarksView() {
  const marks = useRecoilValue(MarksAtom);

  return (
    <View>
      <h1>Оценки</h1>
      <ul className={style['marks-list']}>
        {Object.entries(marks).map(([object, values]) => (
          <MarkView key={`${object}`} object={object} marks={values as Mark[]} />
        ))}
      </ul>
    </View>
  );
}

function MarkView({ marks, object }: { marks: Mark[]; object: string }) {
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
    <>
      {marks.map((mark) => (
        <li key={mark.date + mark.details} className={style['mark-container']}>
          <div className={style['mark-info']}>
            <span>{object}</span>
            <span>{mark.details}</span>
            <span className={style['mark-date']}>{mark.date}</span>
          </div>
          <span className={style.mark} style={{ backgroundColor: markColor(+mark.mark) }}>
            {mark.mark}
          </span>
        </li>
      ))}
    </>
  );
}
