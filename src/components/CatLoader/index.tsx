import React from 'react';

import style from './style.module.scss';

export default function CatLoader() {
  return (
    <>
      <div className={style['loading-cat']}>
        <div className={style['cat-body']}></div>
        <div className={style['cat-animation-mask']}></div>
        <div className={style['cat-head']}>
          <div className={style['cat-face']}></div>
          <div className={style['cat-ear']}></div>
          <div className={style['cat-hand']}></div>
          <div className={style['cat-eye']}></div>
          <div className={style['cat-eye-light']}></div>
          <div className={style['cat-mouth']}></div>
          <div className={style['cat-beard left']}></div>
          <div className={style['cat-beard right']}></div>
        </div>
        <div className={style['cat-foot']}>
          <div className={style['cat-belly']}></div>
          <div className={style['cat-leg']}></div>
          <div className={style['cat-tail']}></div>
        </div>
      </div>
      <div
        style={{ color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Загрузка...</h1>
      </div>
    </>
  );
}
