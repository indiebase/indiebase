'use client';

import { Container, Text } from '@mantine/core';
import { useEffect } from 'react';

import { InviteSelect } from '~/components/InviteSelect';
import { confetti } from '~/utils';

export default function Page() {
  useEffect(() => {
    setTimeout(() => {
      confetti.burst();
    }, 1000);
  }, []);

  return (
    <Container>
      <Text
        variant="gradient"
        gradient={{ from: '#018d63', to: 'lime', deg: 45 }}
        fw={700}
        fz="h1"
        mb="xl"
      >
        Create Organization Successfully !
      </Text>
      <button onClick={confetti.burst}>clc</button>
      <InviteSelect
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
