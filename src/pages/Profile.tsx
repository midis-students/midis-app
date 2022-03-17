import {
  Avatar,
  Banner,
  Button,
  Div,
  Group,
  Header,
  Panel,
  PanelHeader,
  RichCell,
} from '@vkontakte/vkui';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { updateConnectedValue } from '../atoms/ConnectedStore';
import { authState, ProfileState } from '../atoms/Profile';
import { PageProp } from './types';

export default function ProfilePage(props: PageProp) {
  const profile = useRecoilValue(ProfileState);
  return (
    <Panel id={props.id}>
      <PanelHeader>Профиль</PanelHeader>
      <Group>
        <RichCell
          disabled
          multiline
          before={<Avatar size={72} src={profile?.data.pic} />}
          caption={profile?.data.group}
          actions={
            <>
              <Button
                mode="destructive"
                size="s"
                onClick={() => {
                  localStorage.removeItem('token');
                  updateConnectedValue(authState, '');
                }}>
                Выйти
              </Button>
            </>
          }>
          {profile?.data.name}
        </RichCell>
      </Group>
      <Group header={<Header>Прочее</Header>}>
        <Banner
          before={
            <Avatar
              size={64}
              mode="image"
              src="https://sun3-17.userapi.com/s/v1/ig2/wTnlQ73AKO6TsUvel9qeE6z1ReqO7dBy_iRbb8jejYGTcA1ZrXTHtlIhvH4voC8qsv-GkE95E17jcOSka3smlZEu.jpg?size=200x200&quality=95&crop=102,102,819,819&ava=1"
            />
          }
          header="Группа приложения Мидис Студент"
          subheader="Следите за обновлением приложения и получайте уведомление об новых оценках или изменениях в расписание от бота (в разработке)"
          actions={
            <Button stretched href="https://vk.com/studentmidis">
              Перейти
            </Button>
          }
        />
        <Banner
          before={
            <Avatar
              size={64}
              mode="image"
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            />
          }
          header="GitHub Мидис Студента"
          subheader="Для особо умных ♥"
          actions={
            <Button stretched href="https://github.com/DamirLut/midis-app">
              Перейти
            </Button>
          }
        />
      </Group>
    </Panel>
  );
}
