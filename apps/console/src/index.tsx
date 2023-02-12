import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {
  commonEn,
  commonZh,
  twoFactorZh,
  tableEn,
  tableZh,
  accessZh,
} from './i18n';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      'zh-CN': {
        common: commonZh,
        setting: [twoFactorZh, accessZh],
        table: tableZh,
      },
      en: {
        common: commonEn,
        table: tableEn,
      },
    },
    fallbackLng: ['en'],
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
  console.info = () => {};
}

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
