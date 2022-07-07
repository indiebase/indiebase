import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useIntl } from '@ant-design/pro-provider';
import { isBrowser } from '@ant-design/pro-utils';
import { Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const FullScreenIcon = () => {
  const intl = useIntl();
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
    <Tooltip label={intl.getMessage('tableToolBar.exitFullScreen', '全屏')}>
      <FullscreenExitOutlined />
    </Tooltip>
  ) : (
    <Tooltip label={intl.getMessage('tableToolBar.fullScreen', '全屏')}>
      <FullscreenOutlined />
    </Tooltip>
  );
};

export default React.memo(FullScreenIcon);
