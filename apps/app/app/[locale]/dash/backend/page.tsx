'use client';

import { Container } from '@mantine/core';
import { useRouter } from 'next/navigation';

import { ProjectTileGroup } from '~/components/Tiles';

export default function Page() {
  const router = useRouter();

  return (
    <Container mt="xl" size="lg">
      <h1>Projects</h1>
      <h3>Style1</h3>
      <ProjectTileGroup
        backgroundStyle={1}
        onTileClick={() => {
          router.push('/dash/indiebase/backend');
        }}
      />
      <h3>Style2</h3>
      <ProjectTileGroup
        backgroundStyle={2}
        onTileClick={() => {
          router.push('/dash/indiebase/backend');
        }}
      />
      <h3>Style2</h3>
      <ProjectTileGroup
        backgroundStyle={3}
        onTileClick={() => {
          router.push('/dash/indiebase/backend');
        }}
      />
    </Container>
  );
}
