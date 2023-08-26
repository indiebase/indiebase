import { Stack, Button, Text, Box, Group, Anchor } from '@mantine/core';

export const Footer = function () {
  return (
    <Box p="md">
      <Stack align="center">
        <Group>
          <Button>One</Button>
          <Button variant="white">Two</Button>
          <Button variant="white">Three</Button>
        </Group>
        <Stack align="center">
          <Text size="xs">
            Copyleft© {new Date().getFullYear()}&nbsp;
            <Anchor href="https://deskbtm.com" target="_blank">
              Deskbtm
            </Anchor>
            &nbsp;
            <Anchor href="https://github.com/Nawbc" target="_blank">
              Han
            </Anchor>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
};
