import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Box, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isNormalStringRegExp } from '@letscollab-community/console-utils';

const CreateOrganization = function () {
  const form = useForm({
    initialValues: {
      name: '',
      termsOfService: false,
    },

    validate: {
      name: (value) =>
        isNormalStringRegExp(value) ? null : 'Invalid organization name',
    },
  });

  return (
    <>
      <Box style={{ maxWidth: 800 }}>
        <Title order={4}>Create your organization</Title>
        <TextInput
          style={{ width: 500 }}
          mt={20}
          withAsterisk
          label="Organization Name"
          {...form.getInputProps('name')}
        />
        <TextInput
          style={{ width: 500 }}
          mt="md"
          label="Email"
          withAsterisk
          placeholder="Email"
          {...form.getInputProps('email')}
        />
      </Box>
    </>
  );
};

export const CreateOrganizationPage = function () {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box m={20} mt={10}>
          <CreateOrganization />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
