import { useEffect } from 'react';

export const useRemoveAppShellLeftPadding = function () {
  useEffect(() => {
    const appShell = document.querySelector('.mantine-AppShell-main');
    appShell.classList.add('remove-padding-left');
    return () => {
      appShell.classList.remove('remove-padding-left');
    };
  }, []);
};
