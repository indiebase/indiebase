// Init the kDevMode env etc
import '@deskbtm/gadgets/env';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense>
      <App />
    </Suspense>
  </React.StrictMode>,
);
