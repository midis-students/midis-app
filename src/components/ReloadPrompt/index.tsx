import React from 'react';

import style from './style.module.scss';

import { useRegisterSW } from 'virtual:pwa-register/react';

function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  return (
    <div className={style.container}>
      {(offlineReady || needRefresh) && (
        <div className={style.toast}>
          <div className={style.message}>
            {offlineReady ? (
              <span>Приложение готово работать оффлайн!</span>
            ) : (
              <span>Новое обновление доступно!</span>
            )}
          </div>
          {needRefresh && (
            <button className={style['toast-button']} onClick={() => updateServiceWorker(true)}>
              Обновить
            </button>
          )}
          <button className={style['toast-button']} onClick={() => close()}>
            Закрыть
          </button>
        </div>
      )}
    </div>
  );
}

export default ReloadPrompt;
