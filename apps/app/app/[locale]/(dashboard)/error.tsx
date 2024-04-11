'use client';

import { ConfigurableError, ErrorFallback } from '~/components/Fallback';
import { type NOP } from '@deskbtm/gadgets/nop';

export default function Error({
  error,
  reset,
}: {
  error: ConfigurableError;
  reset: typeof NOP;
}) {
  return <ErrorFallback error={error} resetErrorBoundary={reset} />;
}
