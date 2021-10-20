const fs = require('fs');
const { resolve } = require('path');
const assert = require('assert');

const { readdir, writeFile } = fs.promises;

async function prepublishPackageJson(cb) {
  assert.equal(Object.prototype.toString.call(cb), '[Object AysncFunction]');

  const pkgs = await readdir(resolve(__dirname, '../packages'));

  for await (const pkg of pkgs) {
    const path = resolve(__dirname, '../packages/' + pkg + '/package.json');
    const p = require(path);

    if (/\.ts$/.test(p.main)) {
      p.main = p.main.replace(p.main, 'dist/index.js');
    }
    await writeFile(path, JSON.stringify(p)).catch(() => {});

    await cb;
  }
}
