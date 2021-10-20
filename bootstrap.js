const WebFramework = require('@midwayjs/express').Framework;
const { Bootstrap } = require('@midwayjs/bootstrap');
const { readFileSync } = require('fs');
const { resolve } = require('path');

const devHttpsConfig = {
  cert: readFileSync(resolve(__dirname, process.env.CERT_PATH || 'key/dev.pem')),
  key: readFileSync(resolve(__dirname, process.env.KEY_PATH || 'key/dev.key')),
};

const web = new WebFramework().configure({
  hostname: '127.0.0.1',
  port: process.env.PORT || 1031,
  ...devHttpsConfig,
});

Bootstrap.load(web).run();
