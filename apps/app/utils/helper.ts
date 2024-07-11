import { relative } from 'path';

/* eslint-disable no-console */
export const reRenderPrint = function (message?: any) {
  console.debug(
    `------------------------------ ${message} - re-render ---------------------------------`,
  );
};

export const isWithinPath = function (child: string, parent: string) {
  return relative(child, parent).startsWith('..');
};
