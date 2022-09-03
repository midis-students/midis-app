import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs, { Tab } from '../../components/Tabs';
import MarksView from './Panels/Marks';
import ProfileView from './Panels/Profile';
import TableView from './Panels/Table';

import IconMark from '../../assets/mark.svg';
import IconProfile from '../../assets/profile.svg';
import IconTable from '../../assets/table.svg';

export default function MainPage() {
  const [tabIndex, setTabIndex] = React.useState(1);

  const handelChangeIndex = (e: number) => {
    setTabIndex(e);
  };

  const tabs = [
    {
      icon: IconMark,
      label: 'Оценки',
    },
    {
      icon: IconTable,
      label: 'Расписание',
    },
    {
      icon: IconProfile,
      label: 'Профиль',
    },
  ];

  return (
    <main>
      <SwipeableViews index={tabIndex} enableMouseEvents onChangeIndex={handelChangeIndex}>
        <MarksView />
        <TableView />
        <ProfileView />
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

