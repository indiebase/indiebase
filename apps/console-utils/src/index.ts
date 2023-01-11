export * from './utils';
export * from './components';
export * from './api';
export * from './vectors';
export * from './common';
export * from './atoms';
export * from './hooks';

console.log(process.env);

process.env.REACT_APP_IS_MOCK === 'true' && require('./__mock__');
