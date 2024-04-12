'use client';

import { useBirth } from 'reactgets';

export const SuperCowPower = function () {
  useBirth(() => {
    console.info(`
   /                       \\
 /X/                       \\X\\
|XX\\         _____         /XX|
|XXX\\     _/       \\_     /XXX|___________
 \\XXXXXXX             XXXXXXX/            \\\\\\
   \\XXXX    /     \\    XXXXX/                \\\\\\
        |   0     0   |                         \\
         |           |                           \\
          \\         /                            |______//
           \\       /                             |
            | O_O | \\                            |
             \\ _ /   \\________________           |
                        | |  | |      \\         /
  I also have           / |  / |       \\______/
super cow power...      \\ |  \\ |        \\ |  \\ |
                      __| |__| |      __| |__| |
                      |___||___|      |___||___|
    `);
  });
  return null;
};
