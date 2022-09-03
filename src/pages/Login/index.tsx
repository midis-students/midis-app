import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ApiError } from '../../lib/api.types';
import { Api } from '../../lib/api';

import style from './style.module.scss';

export default function LoginPage() {
  const isDark = true;

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<ApiError | null>(null);

  const auth = () => {
    Api.login(login, password).then((data) => {
      if (typeof data === 'object') {
        setError(data);
      } else {
        location.reload();
      }
    });
  };

  return (
    <div className={style.container}>
      <div>
        <div className={style.logotype}>
          <img
            src={`https://web.damirlut.online/splash${isDark ? '_dark' : ''}.png`}
            width="200px"
          />
        </div>
        {error && (
          <div className={style.error}>
            <div>
              <h4>{error.message}</h4>
              <span>{error.longmessage}</span>
            </div>
          </div>
        )}
        <div className={style.form}>
          <Input label="Логин" value={login} onChange={(e) => setLogin(e.currentTarget.value)} />
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <Button variant="success" onClick={auth}>
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
}
