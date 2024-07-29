'use client';

import { Container } from '@mantine/core';

import { ProjectTileGroup } from '~/components/Tiles';

export default function Page() {
  return (
    <Container mt="xl" size="lg">
      My Home Page
      <ProjectTileGroup />
      <ProjectTileGroup backgroundStyle={2} />
      <ProjectTileGroup backgroundStyle={3} />
    </Container>
  );
}
