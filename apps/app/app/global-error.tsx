'use client';

import { type NOP } from '@deskbtm/gadgets';
import {
  ActionIcon,
  Code,
  Collapse,
  Group,
  rem,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconDetails,
  IconMessageReport,
  IconRefresh,
} from '@tabler/icons-react';

import { type ConfigurableError } from '~/components/Fallback';

export const GlobalError = ({
  error,
  reset,
}: {
  error: ConfigurableError & { digest?: string };
  reset: typeof NOP;
}) => {
  const t = error?.title;
  const d = error?.description || error?.message;
  const [opened, handler] = useDisclosure(error?.showDetails);

  return (
    <html>
      <body>demo</body>
    </html>
  );
};

GlobalError.displayName = '@indiebase/app/GlobalError';

export default GlobalError;
