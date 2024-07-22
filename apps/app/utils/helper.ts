import { relative } from 'path';

/* eslint-disable no-console */
export const reRenderProbe = function (message?: any) {
  console.debug(
    `%c [Indiebase] 🤯${message} - re-render `,
    'background: #350091; color: #FFFFFF',
  );
};

export const isWithinPath = function (child: string, parent: string) {
  return relative(child, parent).startsWith('..');
};
