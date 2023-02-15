import { Center, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC } from 'react';
import { useRemoveAppShellLeftPadding } from '../hooks';

export const HttpStatusPage: FC<{ label?: string }> = function (props) {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  let gradient;

  switch (props.label) {
    case '404':
      gradient = { from: '#FF00B3', to: '#EC0047', deg: 45 };
      break;
    default:
      gradient = { from: '#FF00B3', to: '#EC0047', deg: 45 };
  }

  useRemoveAppShellLeftPadding();
  return (
    <Center
      sx={{
        height: 'calc(80vh - 60px)',
      }}
    >
      <Text
        component="span"
        align="center"
        variant="gradient"
        gradient={gradient}
        weight={700}
        style={{ fontSize: matches ? 120 : 200 }}
      >
        {props.label}
      </Text>
    </Center>
  );
};

HttpStatusPage.defaultProps = {
  label: '404',
};
