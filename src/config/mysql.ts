import { registerAs } from '@nestjs/config';

const isSync = function () {
  if (process.env.NODE_ENV === 'production') {
    return false;
  } else if (process.env.NODE_ENV === 'demo') {
    return false;
  } else {
    return true;
  }
};

export default registerAs('mysql', () => ({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['dist/**/*.entity.{js,ts}'],
  synchronize: isSync(),
  migrationsRun: true,
}));
