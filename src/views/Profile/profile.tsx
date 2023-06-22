import { FC } from 'react';
import {
  Icon12ArrowUpRightOutSquareOutline,
  Icon28DocumentTextOutline,
  Icon28PaletteOutline,
  Icon28WriteOutline,
} from '@vkontakte/icons';
import {
  Avatar,
  Button,
  ButtonGroup,
  calcInitialsAvatarColor,
  Div,
  Footer,
  Group,
  Header,
  SimpleCell,
  Switch,
  Title,
} from '@vkontakte/vkui';

import { Page } from '@/components/Page';
import { VERSION } from '@/config/app';
import { LINK_SUPPORT_CHAT } from '@/config/vk';
import { MidisProfile } from '@/lib/api/types';
import { useScheme } from '@/store/scheme';

type PanelProps = {
  nav: string;
};

const MockProfile: MidisProfile = {
  avatar: 'https://github.com/damirlut.png',
  name: 'Лутфрахманов Дамир',
  group: 'П-38',
  type: 'Студент',
  online: true,
  last_activity: Date.now(),
  id: 15343,
};

export const PanelProfile: FC<PanelProps> = (props) => {
  const profile = MockProfile;
  const { scheme, switchScheme } = useScheme();

  const [last_name, first_name] = profile.name.split(' ');

  return (
    <Page nav={props.nav} title={'Профиль'}>
      <Group>
        <SimpleCell
          before={
            <Avatar
              src={profile.avatar}
              size={72}
              initials={last_name[0] + first_name[0]}
              gradientColor={calcInitialsAvatarColor(profile.id)}
            >
              <Avatar.BadgeWithPreset preset={'online'} />
            </Avatar>
          }
          disabled
          subtitle={profile.type + ', ' + profile.group}
        >
          <Title level={'3'}>{last_name}</Title>
          <Title level={'3'}>{first_name}</Title>
        </SimpleCell>
        <Div>
          <ButtonGroup>
            <Button
              after={<Icon12ArrowUpRightOutSquareOutline />}
              style={{
                color: '#fff',
                backgroundColor: 'var(--midis-accent)',
              }}
            >
              Профиль портал
            </Button>
            <Button after={<Icon12ArrowUpRightOutSquareOutline />}>
              Профиль ВК
            </Button>
          </ButtonGroup>
        </Div>
      </Group>
      <Group header={<Header>Настройки</Header>}>
        <SimpleCell
          Component="label"
          before={<Icon28PaletteOutline />}
          after={
            <Switch
              defaultChecked={scheme === 'dark'}
              onChange={() => switchScheme(scheme, true)}
            />
          }
        >
          Темная тема
        </SimpleCell>
        <SimpleCell
          before={<Icon28DocumentTextOutline />}
          onClick={() => ''}
          expandable
        >
          Правила
        </SimpleCell>
        <SimpleCell
          before={<Icon28WriteOutline />}
          onClick={() => window.open(LINK_SUPPORT_CHAT, '_blank')}
        >
          Обратная связь
        </SimpleCell>
      </Group>
      <Div style={{ marginTop: 'auto' }}>
        <Button stretched size="m" appearance="negative" mode={'outline'}>
          Выйти
        </Button>
      </Div>
      <Footer>{VERSION}</Footer>
    </Page>
  );
};
