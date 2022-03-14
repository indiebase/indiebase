const { Bootstrap } = require('@midwayjs/bootstrap');
Bootstrap.configure({
  imports: require('./dist/index'),
  moduleDetector: false,
}).run();
