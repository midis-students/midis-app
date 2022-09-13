import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CatLoader from './components/CatLoader';
import { ErrorBoundary } from './components/ErrorBoundary';
import ReloadPrompt from './components/ReloadPrompt';
import { Api } from './lib/api';
import LoginPage from './pages/Login';
import MainPage from './pages/Main';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const version = 1; /// Breaking changes version, for clear cache

  React.useEffect(() => {
    if (Number(localStorage.getItem('version')) != version) {
      console.log('Breaking changes detected, clear cache...');
      localStorage.clear();
      localStorage.setItem('version', version.toString());
      window.location.reload();
    }

    Api.test().then((ok) => {
      if (!ok) {
        if (location.pathname !== '/login') navigate('/login' + location.search);
      } else {
        if (location.pathname !== '/') navigate('/');
      }
    });
  }, []);

  return (
    <ErrorBoundary>
      <ReloadPrompt />
      <React.Suspense fallback={<CatLoader />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </React.Suspense>
    </ErrorBoundary>
  );
}

export default App;
