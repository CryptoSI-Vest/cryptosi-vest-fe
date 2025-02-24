import React from 'react';
import ReactDOM from 'react-dom/client';
import { Helmet } from 'react-helmet';

import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Helmet
      defaultTitle='Vite React Tailwind Starter'
      titleTemplate='%s | Vite React Tailwind Starter'
    >
      <meta charSet='utf-8' />
      <html lang='id' amp />
    </Helmet>
    <App />
  </React.StrictMode>
);
