'use client';

import { Button, Container, Stack, Text, useMantineTheme } from '@mantine/core';

import { InviteInput } from '~/components/InviteInput';

export default function Page() {
  const theme = useMantineTheme();

  return (
    <Container mt={120} size="sm">
      <Text fw={700} fz="h1" mb={10}>
        Welcome to xxxxxxxxx !
      </Text>
      <Text fw={700} mb={60}>
        Invite some peoples to your new organization.
      </Text>
      <InviteInput />
      <Stack mt="xl">
        <Button
          size="md"
          fullWidth
          variant="gradient"
          gradient={theme.other.gradients.peach}
        >
          Next
        </Button>
        <Button size="xs" variant="transparent" fw="normal">
          Skip this step
        </Button>
      </Stack>
    </Container>
  );
}
