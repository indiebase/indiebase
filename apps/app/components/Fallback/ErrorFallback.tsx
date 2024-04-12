import type { StyleProp } from '@mantine/core';
import { Box, Flex } from '@mantine/core';
import { type FC, useMemo } from 'react';
import type { FallbackProps } from 'react-error-boundary';

import { ErrorDetail } from './ErrorDetail';
import { UnknownError } from './Errors';

export interface ErrorFallbackProps extends FallbackProps {
  height?: StyleProp<React.CSSProperties['height']>;
}

export const ErrorFallback: FC<ErrorFallbackProps> = function (props) {
  const { error, resetErrorBoundary, height } = props;

  const content = useMemo<{ title?: string; description?: string }>(() => {
    switch (true) {
      case error instanceof UnknownError:
      default:
        return {
          title: 'Whoops' + ' !!!',
          description: 'Something went wrong' + '.',
        };
    }
  }, [error]);

  return (
    <Flex direction="column" justify="center" align="center" h={height}>
      <Box
        w={{
          base: '100%',
          lg: '55%',
          sm: '100%',
        }}
      >
        <ErrorDetail error={error} onRetry={resetErrorBoundary} {...content} />
      </Box>
    </Flex>
  );
};
