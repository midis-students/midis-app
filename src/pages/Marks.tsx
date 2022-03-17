import {
  CardGrid,
  ContentCard,
  Counter,
  Group,
  Header,
  List,
  Panel,
  PanelHeader,
  SimpleCell,
} from '@vkontakte/vkui';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { AppMarksState } from '../atoms/App';
import { APIMark } from '../lib/midis-api.types';
import { PageProp } from './types';

const color = ['#9c1010', '#9c1010', '#ffd208', '#ff9412', '#0c7515'];

export default function MarksPage(props: PageProp) {
  const Marks = useRecoilValue(AppMarksState);
  if (Marks === undefined) return null;

  const lastMark = React.useMemo<APIMark[]>(() => {
    let list: APIMark[] = [];
    Object.entries(Marks).forEach(([object, marks]) => {
      marks.forEach((mark) => list.push({ ...mark, object }));
    });

    list = list.sort((pre, next) => {
      ///@ts-ignore
      const pre_date = new Date(...pre.date.split(' ')[1].split('.').reverse());
      ///@ts-ignore
      const next_date = new Date(...next.date.split(' ')[1].split('.').reverse());

      return next_date.getTime() - pre_date.getTime();
    });

    return list.slice(0, 7);
  }, [Marks]);

  return (
    <Panel id={props.id}>
      <PanelHeader>Успеваемость</PanelHeader>
      <Group header={<Header>Последние оценки</Header>}>
        <CardGrid size="l">
          {lastMark.map((mark) => (
            <Mark key={mark.date + mark.object} mark={mark} />
          ))}
        </CardGrid>
      </Group>
      <Group header={<Header>Все оценки</Header>}>
        <List>
          {Object.entries(Marks).map(([object, marks]) => {
            let arf = 0;
            marks.forEach((mark) => {
              arf += Number(mark.mark);
            });
            arf /= marks.length;
            arf = Math.round(arf);

            return (
              <SimpleCell
                key={object}
                after={<Counter style={{ backgroundColor: color[arf - 1] }}>{arf}</Counter>}>
                {object}
              </SimpleCell>
            );
          })}
        </List>
      </Group>
    </Panel>
  );
}

function Mark({ mark }: { mark: APIMark }) {
  return (
    <ContentCard
      subtitle={mark.object}
      header={
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>{mark.date}</div>
          <Counter style={{ backgroundColor: color[Number(mark.mark) - 1] }}>{mark.mark}</Counter>
        </div>
      }
      text={mark.details}
    />
  );
}
