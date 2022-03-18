import { Icon16Dropdown, Icon24Done } from '@vkontakte/icons';
import {
  CardGrid,
  Cell,
  ContentCard,
  Counter,
  Div,
  Group,
  List,
  Panel,
  PanelHeader,
  PanelHeaderContext,
  Tabs,
  TabsItem,
  Title,
  Text,
} from '@vkontakte/vkui';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { AppScheduleState } from '../atoms/App';
import { APIDay, APIPar } from '../lib/midis-api.types';
import { IGroup } from '../lib/parser';
import { PageProp } from './types';

export default function TablePage(props: PageProp) {
  const Schedule = useRecoilValue(AppScheduleState);

  if (Schedule == undefined) return null;

  const [activeTab, setActiveTab] = React.useState<'current' | 'full'>('current');
  const [contextOpened, setContextOpened] = React.useState(false);
  const [activeGroup, setActiveGroup] = React.useState(Schedule.groups[0]);

  const group = Schedule?.group(activeGroup);

  return (
    <Panel id={props.id}>
      <PanelHeader>Расписание</PanelHeader>
      <Tabs>
        <TabsItem onClick={() => setActiveTab('current')} selected={activeTab == 'current'}>
          Текущее
        </TabsItem>
        <TabsItem onClick={() => setActiveTab('full')} selected={activeTab == 'full'}>
          Полное
        </TabsItem>
        <TabsItem
          onClick={() => setContextOpened(!contextOpened)}
          after={
            <Icon16Dropdown
              style={{
                transform: `rotate(${contextOpened ? '180deg' : '0'}) translateY(1px)`,
              }}
            />
          }>
          Подгруппа
        </TabsItem>
      </Tabs>
      <PanelHeaderContext opened={contextOpened} onClose={() => setContextOpened(false)}>
        <List>
          {Schedule.groups.map((_group) => (
            <Cell
              key={_group}
              after={activeGroup == _group ? <Icon24Done /> : null}
              onClick={() => setActiveGroup(_group)}>
              {_group}
            </Cell>
          ))}
        </List>
      </PanelHeaderContext>
      <Group>
        <Layout tab={activeTab} group={group} />
      </Group>
    </Panel>
  );
}

function Layout({ tab, group }: { tab: string; group: IGroup }) {
  if (tab == 'current') {
    return (
      <>
        {group.now_day ? <Day day={group.now_day} /> : null}
        {group.next_day ? <Day day={group.next_day} /> : null}
      </>
    );
  }
  return (
    <>
      {group.weeks.map((week) => (
        <React.Fragment key={week.name}>
          <Title level="3" style={{ marginLeft: '1rem' }}>
            {week.name}
          </Title>
          {week.days.map((day) => (
            <Day key={day.name} day={day} />
          ))}
        </React.Fragment>
      ))}
    </>
  );
}

function Day({ day }: { day: APIDay }) {
  if (Object.keys(day).length === 0) return null;

  const parType = (par: APIPar) => {
    const colors = {
      active: '#4bb34b',
      default: '#aeb7c2',
      danger: '#ff3347',
      zoom: '#2688eb',
    };
    const now = new Date();
    const start = new Date();
    start.setHours(+par.time.start.split(':')[0]);
    start.setMinutes(+par.time.start.split(':')[1]);
    const end = new Date();
    end.setHours(+par.time.end.split(':')[0]);
    end.setMinutes(+par.time.end.split(':')[1]);
    if (day.name.includes('Сегодня')) {
      if (now.getTime() > start.getTime() && now.getTime() < end.getTime()) {
        return colors.active;
      }
    }
    return par?.danger
      ? colors.danger
      : Number(par.class) + '' == 'NaN'
      ? colors.zoom
      : colors.default;
  };

  return (
    <>
      <Div>
        <Title level="3">
          {day.name} {day.pars[0]?.time.start}-{day.pars.at(-1)?.time.end}
        </Title>
      </Div>
      <CardGrid size="l">
        {day.pars.map((par) => (
          <ContentCard
            key={par.id}
            text={
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div> {`${par?.time?.start}-${par?.time?.end}`}</div>

                <div>{par.class}</div>
              </div>
            }
            header={
              <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <div style={{ marginRight: '.25em' }}>
                  <Counter size="s" style={{ backgroundColor: parType(par) }}>
                    {par.id}
                  </Counter>
                </div>
                <Text weight="medium">
                  {par.object}
                  {par.flow != 'Все' ? ` (Поток: ${par.flow})` : ''}
                </Text>
              </div>
            }
            caption={par.teacher}
          />
        ))}
      </CardGrid>
    </>
  );
}
