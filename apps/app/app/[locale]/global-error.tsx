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

import type { ConfigurableError } from '~/app/Errors';

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
    <>
      <Stack align="center" gap={6}>
        {t && <Title size="h2">{t}</Title>}
        {d && (
          <Text size="sm" c="gray">
            {d}
          </Text>
        )}
        <Group>
          {error?.retryable && (
            <Tooltip label="Retry" openDelay={500}>
              <ActionIcon
                onClick={reset}
                size="xs"
                c="gray"
                variant="transparent"
                aria-label="Error retry button"
              >
                <IconRefresh />
              </ActionIcon>
            </Tooltip>
          )}
          {
            <Tooltip label="Show details" openDelay={500}>
              <ActionIcon
                size="xs"
                c="gray"
                variant="transparent"
                aria-label="Show details button"
                onClick={() => handler.toggle()}
              >
                <IconDetails />
              </ActionIcon>
            </Tooltip>
          }
          {error?.reportable && (
            <Tooltip label="Report" openDelay={500}>
              <ActionIcon
                size="xs"
                c="gray"
                variant="transparent"
                aria-label="Report button"
              >
                <IconMessageReport />
              </ActionIcon>
            </Tooltip>
          )}
        </Group>
      </Stack>
      {
        <Collapse pt="lg" px="xl" in={opened} mah="50%">
          <ScrollArea scrollbarSize={2} style={{ borderRadius: rem(6) }}>
            <Code bg="red.1" block c="red" style={{ whiteSpace: 'unset' }}>
              {String(error?.stack ?? error)}
            </Code>
          </ScrollArea>
        </Collapse>
      }
    </>
  );
};

GlobalError.displayName = '@indiebase/app/GlobalError';

export default GlobalError;
