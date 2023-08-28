// Init the kDevMode env etc
import '@deskbtm/gadgets/env';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import App from './App.tsx';
import './index.css';
import { reportWebVitals } from './reportWebVitals.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense>
      <App />
    </Suspense>
  </React.StrictMode>,
);

reportWebVitals(!kProdMode ? console.debug : undefined);
