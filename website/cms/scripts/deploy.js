// var ghpages = require('gh-pages');
// var { exec } = require('child_process');
// var ora = require('ora');
// var { resolve } = require('path');
// require('dotenv').config({ path: resolve(__dirname, '../.env.production') });

// async function publish() {
//   ghpages.publish(
//     'dist',
//     {
//       branch: 'master',
//       repo: 'https://github.com/sewerganger/app-mgmt-dashboard.git',
//       message: 'Auto-generated commit',
//       user: {
//         name: 'sewerganger',
//         email: 'wanghan9423@outlook.com',
//       },
//     },
//     (err) => {
//       if (err) {
//         throw err;
//       }
//     },
//   );
// }

// async function buildProduction() {
//   await new Promise((resolve, reject) => {
//     exec('npm run build', (error) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve();
//       }
//     });
//   });
// }

// (async function name() {
//   const spinner = ora('building production...').start();
//   await buildProduction();
//   spinner.stop();
//   spinner.clear();
//   console.log('build Success');
//   spinner.start('deploying production...');
//   await publish();
//   spinner.stop();
//   spinner.clear();
//   console.log('deploy Success\n');
// })();
