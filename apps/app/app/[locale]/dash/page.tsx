'use client';

import { Container } from '@mantine/core';
import { useRouter } from 'next/navigation';

// import { Navbar } from '~/components/Dashboard/Navbar';
import { ProjectTileGroup } from '~/components/Tiles';

export default function Page() {
  const router = useRouter();
  return (
    <Container mt="xl" size="lg">
      {/* <Navbar mode="personal" /> */}
      My Home Page
      <ProjectTileGroup
        onTileClick={(p) => {
          console.log(p);
          router.push('/dash/indiebase/backend');
          // router.push('/dash/indiebase/backend');
          // location.href = '/dash/indiebase/backend';
        }}
      />
      <ProjectTileGroup
        backgroundStyle={2}
        onTileClick={() => {
          location.href = '/dash/indiebase/backend';
        }}
      />
      <ProjectTileGroup
        backgroundStyle={3}
        onTileClick={() => {
          location.href = '/dash/indiebase/backend';
        }}
      />
    </Container>
  );
}
