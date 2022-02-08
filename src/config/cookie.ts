import { registerAs } from '@nestjs/config';

export default registerAs('cookie', () => ({
  secret: process.env.COOKIE_SECRET,
}));
