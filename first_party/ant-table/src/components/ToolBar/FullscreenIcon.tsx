import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { isBrowser } from '@letscollab/ant-utils';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconMaximize, IconMaximizeOff } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const FullScreenIcon = () => {
  const { t } = useTranslation(['table']);
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  useEffect(() => {
    if (!isBrowser()) {
      return;
    }
    document.onfullscreenchange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
  }, []);
  return fullscreen ? (
    <Tooltip
      transition="rotate-left"
      transitionDuration={200}
      withArrow
      label={t('Exit full screen')}
    >
      <ActionIcon size="sm" color="red" variant="transparent">
        <IconMaximizeOff />
      </ActionIcon>
    </Tooltip>
  ) : (
    <Tooltip
      transition="rotate-left"
      transitionDuration={200}
      withArrow
      label={t('Full screen')}
    >
      <ActionIcon size="sm" color="dark" variant="transparent">
        <IconMaximize />
      </ActionIcon>
    </Tooltip>
  );
};

export default React.memo(FullScreenIcon);
