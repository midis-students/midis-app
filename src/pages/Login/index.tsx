import React from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { ApiError } from '../../lib/api.types';
import { Api } from '../../lib/api';

import style from './style.module.scss';
import { useSearchParams } from 'react-router-dom';

export default function LoginPage() {
  const isDark = true;

  const [searchParams] = useSearchParams();

  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<ApiError | null>(null);

  React.useEffect(() => {
    if (searchParams.has('login') && searchParams.has('password')) {
      auth(searchParams.get('login'), searchParams.get('password'));
    }
  }, []);

  const auth = (_login: string | null = null, _password: string | null = null) => {
    _login = _login || login;
    _password = _password || password;
    Api.login(_login, _password).then((data) => {
      if (typeof data === 'object') {
        setError(data);
      } else {
        location.reload();
      }
    });
  };

  return (
    <div className={style.container}>
      <div className={style.containerWrapper}>
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
          <Button variant="success" onClick={() => auth()}>
            Войти
          </Button>
        </div>
      </div>
    </div>
  );
}
