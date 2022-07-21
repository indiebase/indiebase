import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { enUS, zhCN } from './i18n';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        translation: enUS,
      },
      'zh-CN': {
        translation: zhCN,
      },
    },
    fallbackLng: ['zh-CN'],
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

// if (process.env.NODE_ENV === 'production') {
//   console.log = () => {};
// }

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
