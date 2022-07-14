import { Center, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FC } from 'react';

export const HttpStatusPage: FC<{ label?: string }> = function (props) {
  const matches = useMediaQuery('(max-width: 768px)');

  let gradient;

  switch (props.label) {
    case '404':
      gradient = { from: '#FF00B3', to: '#EC0047', deg: 45 };
      break;
    default:
      gradient = { from: '#FF00B3', to: '#EC0047', deg: 45 };
  }

  return (
    <Center
      sx={{
        height: 'calc(100vh - 60px)',
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
