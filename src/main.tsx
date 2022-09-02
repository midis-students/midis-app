import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import App from './App';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <RecoilRoot>
        <RecoilNexus />
        <App />
      </RecoilRoot>
    </BrowserRouter>
  </React.StrictMode>,
);
