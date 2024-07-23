'use client';

import { type NOP } from '@deskbtm/gadgets/nop';
import { Center, Container } from '@mantine/core';

import { type ConfigurableError, ErrorFallback } from '~/components/Fallback';

export default function Error({
  error,
  reset,
}: {
  error: ConfigurableError;
  reset: typeof NOP;
}) {
  return (
    <Center h="100dvh" component={Container}>
      <ErrorFallback error={error} resetErrorBoundary={reset} />
    </Center>
  );
}
