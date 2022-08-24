export * from './utils';
export * from './interface';
export * from './constant';
export * from './components';
export * from './api';
export * from './vectors';

console.log(process.env);

Boolean(process.env.REACT_APP_IS_MOCK) && require('./__mock__');
