'use client';

import { Container } from '@mantine/core';

import { ProjectTileGroup } from '~/components/Tiles';

export default function Home() {
  return (
    <Container size="lg">
      <ProjectTileGroup />
    </Container>
  );
}
