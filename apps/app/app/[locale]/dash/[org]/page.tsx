'use client';

import { Container } from '@mantine/core';
import { useRouter } from 'next/router';

import { ProjectTileGroup } from '~/components/Tiles';

export default function Page() {
  const router = useRouter();

  const { org } = router.query;
  console.log(org);

  return (
    <Container mt="xl" size="lg">
      <ProjectTileGroup />
    </Container>
  );
}
