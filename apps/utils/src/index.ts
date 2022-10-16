export * from './utils';
export * from './components';
export * from './api';
export * from './vectors';

console.log(process.env);

Boolean(process.env.REACT_APP_IS_MOCK) && require('./__mock__');
