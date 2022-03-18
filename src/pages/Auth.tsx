import React from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  Div,
  FormItem,
  FormStatus,
  Group,
  Header,
  HorizontalCell,
  HorizontalScroll,
  Panel,
} from '@vkontakte/vkui';
import { PageProp } from './types';

import { useInput } from '../hooks/useInput';
import { UserAuth } from '../lib/midis-api';
import { APIUsersList, IError } from '../lib/midis-api.types';
import { useRecoilValue } from 'recoil';
import { PreAuthState, __preAuthState } from '../atoms/Profile';
import { updateConnectedValue } from '../atoms/ConnectedStore';
import { AppErrorState } from '../atoms/App';

export default function AuthPage(props: PageProp) {
  const [login, loginInput] = useInput({ type: 'text', autoFocus: true });
  const [password, passwordInput] = useInput({ type: 'password' });
  const [isdark, setIsdark] = React.useState(false);
  const [error, setError] = React.useState<IError>();
  const [agree, setAgree] = React.useState(false);

  React.useEffect(() => {
    window.onload = () => {
      const isDark = document.body.attributes.getNamedItem('scheme')?.value === 'space_gray';
      setIsdark(isDark);
    };
  }, []);

  const Auth = () => {
    UserAuth(login, password).then((data) => {
      if (data?.error) {
        
          updateConnectedValue(AppErrorState, null);
          setError({
            message: 'Ошибка входа',
            longmessage: 'Не правильно введен логин или пароль',
          });
        
      }
    });
  };

  return (
    <Panel id={props.id}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          marginTop: '3rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <img src={`https://web.damirlut.online/splash${isdark ? '_dark' : ''}.png`} width="200px" />
      </div>
      {error && (
        <FormItem>
          <FormStatus header={error.message} mode="error">
            {error.longmessage}
          </FormStatus>
        </FormItem>
      )}
      <Group>
        <FormItem top="Логин">{loginInput}</FormItem>
        <FormItem top="Пароль">{passwordInput}</FormItem>
        <Checkbox
          description="Нажимая «Войти», вы соглашаетесь на обработку, использование и
              долго срочное хранение ваших персональных данных."
          onClick={() => setAgree(!agree)}
        />
        <Div>
          <Button stretched={true} mode="commerce" size="l" onClick={Auth} disabled={!agree}>
            Войти
          </Button>
        </Div>
      </Group>
      <PreAuth />
    </Panel>
  );
}

function PreAuth() {
  const data = useRecoilValue(PreAuthState);
  const [accounts, setAccounts] = React.useState<APIUsersList[]>([]);
  const fetch = async (params?: any) => {
    updateConnectedValue(__preAuthState, params);
  };
  React.useEffect(() => {
    if (data) {
      if (data instanceof Array) {
        setAccounts(data);
      } else {
        console.log(data);
      }
    }
  }, [data]);

  if (data === undefined) return null;

  return (
    <Group header={<Header>Возможные аккаунты</Header>}>
      <HorizontalScroll>
        <div style={{ display: 'flex' }}>
          {accounts.map((user) => {
            return (
              <HorizontalCell
                key={user.login}
                size="s"
                header={user.name.split(' ')[0]}
                onClick={() => {
                  fetch(user.login);
                }}>
                <Avatar src={user.pic} size={72} />
              </HorizontalCell>
            );
          })}
        </div>
      </HorizontalScroll>
    </Group>
  );
}
