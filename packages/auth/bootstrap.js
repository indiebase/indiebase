const { Bootstrap } = require('@midwayjs/bootstrap');

const isDevelopment = process.env.NODE_ENV === 'development';

Bootstrap.configure({
  imports: !isDevelopment && require('./dist/index'),
}).run();
