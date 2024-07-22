'use client';

import { Container } from '@mantine/core';

import { ProjectTileGroup } from '~/components/Tiles';

export default function Home() {
  return (
    <Container mt="xl" size="lg">
      <ProjectTileGroup />
    </Container>
  );
}
