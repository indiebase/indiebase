const WebFramework = require('@midwayjs/express').Framework;
const { Bootstrap } = require('@midwayjs/bootstrap');
const { readFileSync } = require('fs');
const { resolve } = require('path');
const { defaults } = require('joi/lib/common.js');

/**
 * @see {@link https://www.yuque.com/midwayjs/midway_v2/validate#Njpv0}
 */
defaults.allowUnknown = true;

const devHttpsConfig = {
  cert: readFileSync(resolve(__dirname, process.env.CERT_PATH || 'key/dev.pem')),
  key: readFileSync(resolve(__dirname, process.env.KEY_PATH || 'key/dev.key')),
};

const web = new WebFramework().configure({
  hostname: '127.0.0.1',
  port: process.env.PORT || 9888,

  ...devHttpsConfig,
});

Bootstrap.load(web).run();

const a = 1 + 1;
