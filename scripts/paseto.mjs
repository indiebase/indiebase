import { V4 } from 'paseto';

console.log(
  await V4.generateKey('public', {
    format: 'paserk',
  }),
);
