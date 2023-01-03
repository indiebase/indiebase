import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, Grid, MediaQuery, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

const My = function () {
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <>
      <Title order={4}>My Profile</Title>
      <Grid mt={30} grow style={{ flexWrap: 'nowrap' }}>
        <Grid.Col span={9}>
          
        </Grid.Col>
        <Grid.Col span={3}></Grid.Col>
      </Grid>
    </>
  );
};

export const MyProfilePage = function () {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box m={20} mt={10}>
          <My />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
