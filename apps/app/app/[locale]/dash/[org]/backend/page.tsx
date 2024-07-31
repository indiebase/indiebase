'use client';

import { Container } from '@mantine/core';

import { ProjectTileGroup } from '~/components/Tiles';

export default function Page() {
  return (
    <Container mt="xl" size="lg">
      <h1>Projects</h1>
      <h3>Style1</h3>
      <ProjectTileGroup backgroundStyle={1} />
      <h3>Style2</h3>
      <ProjectTileGroup backgroundStyle={2} />
      <h3>Style2</h3>
      <ProjectTileGroup backgroundStyle={3} />
    </Container>
  );
}
