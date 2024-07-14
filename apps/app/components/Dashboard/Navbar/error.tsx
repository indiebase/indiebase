'use client';

import { type NOP } from '@deskbtm/gadgets/nop';

import { type ConfigurableError, ErrorFallback } from '~/components/Fallback';

export default function Error({
  error,
  reset,
}: {
  error: ConfigurableError;
  reset: typeof NOP;
}) {
  return (
    <ErrorFallback error={error} resetErrorBoundary={reset} height="100%" />
  );
}
