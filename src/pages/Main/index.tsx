import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from '../../components/Tabs';
import MarksView from './Panels/Marks';
import ProfileView from './Panels/Profile';
import TableView from './Panels/Table';

import IconMark from '../../assets/mark.svg';
import IconProfile from '../../assets/profile.svg';
import IconTable from '../../assets/table.svg';
import IconChat from '../../assets/chat.svg';
import IconNotes from '../../assets/notes.svg';
import ChatView from './Panels/Chat';
import ObsidianView from './Panels/Obsidian';

export default function MainPage() {
  const [tabIndex, setTabIndex] = React.useState(2);

  const handelChangeIndex = (e: number) => {
    setTabIndex(e);
  };

  const tabs = [
    {
      icon: IconNotes,
      label: 'Заметки',
      view: ObsidianView,
    },
    {
      icon: IconMark,
      label: 'Оценки',
      view: MarksView,
    },
    {
      icon: IconTable,
      label: 'Расписание',
      view: TableView,
    },

    {
      icon: IconProfile,
      label: 'Профиль',
      view: ProfileView,
    },
  ];

  return (
    <main>
      <SwipeableViews index={tabIndex} enableMouseEvents onChangeIndex={handelChangeIndex}>
        {tabs.map((value) => (
          <value.view key={value.view.toString()} />
        ))}
      </SwipeableViews>
      <Tabs>
        {tabs.map((value, i) => (
          <Tab icon={value.icon} key={value.label} id={i} active={tabIndex} onClick={setTabIndex}>
            {value.label}
          </Tab>
        ))}
      </Tabs>
    </main>
  );
}
