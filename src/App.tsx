import React from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CatLoader from './components/CatLoader';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Api } from './lib/api';
import LoginPage from './pages/Login';
import MainPage from './pages/Main';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    Api.test().then((ok) => {
      if (!ok) {
        if (location.pathname !== '/login') navigate('/login');
      } else {
        if (location.pathname !== '/') navigate('/');
      }
    });
  }, []);

  return (
    <ErrorBoundary>
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
