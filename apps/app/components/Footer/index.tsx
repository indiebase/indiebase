import { Stack, Button, Text, Box, Group } from '@mantine/core';
import Link from 'next/link';

export const Footer = function (props) {
  return (
    <Box p="md">
      <Stack align="center">
        <Group spacing={2}>
          <Button variant="white">One</Button>
          <Button variant="white">Two</Button>
          <Button variant="white">Three</Button>
        </Group>
        <Stack align="center">
          <Link href="#">皖ICP备20002736号-2</Link>
          <Text>Copyright© {new Date().getFullYear()} Han</Text>
        </Stack>
      </Stack>
      <Box sx={{ height: 40 }} />
    </Box>
  );
};
