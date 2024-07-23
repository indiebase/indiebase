'use client';

import { Container, rem, Text, useMantineTheme } from '@mantine/core';
import { useEffect } from 'react';

import { InviteInput } from '~/components/InviteInput';
import { confetti } from '~/utils';

export default function Page() {
  const theme = useMantineTheme();

  useEffect(() => {
    setTimeout(() => {
      confetti.burst();
    }, 200);
  }, []);

  return (
    <Container mt={120}>
      <Text variant="gradient" fw={700} fz="h1" mb={60}>
        Set up organization successfully !
      </Text>
      <InviteInput
        data={[
          { label: 'name', value: 'wanghan' },
          { label: 'kkkkk', value: 'wanghan' },
          { label: 'kkkkk1', value: 'wanghan' },
          { label: 'kkkkk2', value: 'wanghan' },
          { label: 'kkkkk3', value: 'wanghan' },
          { label: 'kkkkk4', value: 'wanghan' },
          { label: 'kkkkk5', value: 'wanghan' },
          { label: 'kkkkk6', value: 'wanghan' },
          { label: 'kkkkk7', value: 'wanghan' },
          { label: 'kkkkk8', value: 'wanghan' },
          { label: 'kkkkk9', value: 'wanghan' },
          { label: 'kkkkk10', value: 'wanghan' },
          { label: 'kkkkk11', value: 'wanghan' },
          { label: 'kkkkk12', value: 'wanghan' },
          { label: 'kkkkk13', value: 'wanghan' },
          { label: 'kkkkk14', value: 'wanghan' },
          { label: 'kkkkk15', value: 'wanghan' },
          { label: 'kkkkk16', value: 'wanghan' },
          { label: 'kkkkk17', value: 'wanghan' },
          { label: 'kkkkk18', value: 'wanghan' },
        ]}
      />
    </Container>
  );
}
