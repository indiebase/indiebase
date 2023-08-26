import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import App from './App.tsx';
import './index.css';
// import { kReleaseMode } from '@deskbtm/gadgets/env';
import { reportWebVitals } from './reportWebVitals.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// reportWebVitals(!kReleaseMode ? console.debug : undefined);
