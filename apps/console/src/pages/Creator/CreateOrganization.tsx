import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Avatar,
  Box,
  Button,
  FileButton,
  Flex,
  Select,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  fetchGithubOrg,
  fetchMyGithubOrgs,
  isNormalStringRegExp,
  OrgSelectProps,
  SelectItem,
} from '@letscollab-community/console-utils';
import { useQuery } from '@tanstack/react-query';
import { IconBrandGithub, IconBuildingCommunity } from '@tabler/icons';

const CreateOrganization = function () {
  const [github, setGithub] = useState<OrgSelectProps>();
  const [file, setFile] = useState<File | null>(null);
  const theme = useMantineTheme();
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

  const { data } = useQuery(['github-orgs'], fetchMyGithubOrgs, {
    suspense: true,
  });

  const githubOrgs = useMemo(
    () =>
      data.d.map((v) => ({
        logo: v.avatar_url,
        label: v.login,
        value: v.login,
      })),
    [data],
  );

  console.log(file);

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
        <Flex align="flex-end">
          <Select
            icon={
              <Avatar src={github?.logo} size={14}>
                <IconBrandGithub size={17} />
              </Avatar>
            }
            mt={16}
            label="Pick github organization"
            itemComponent={SelectItem}
            data={githubOrgs}
            searchable
            style={{ width: 250 }}
            maxDropdownHeight={400}
            clearable
            nothingFound="Empty"
            onChange={async (e) => {
              const r = githubOrgs.find((v) => v.value === e);
              if (!r) return;
              setGithub(r);
              form.setFieldValue('githubOrgName', r.value);
              const { d } = await fetchGithubOrg(r.value);
              form.setFieldValue('email', d.email);
            }}
          />
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) => (
              <Avatar {...props} ml={30} size={60}>
                <IconBuildingCommunity size={26} />
              </Avatar>
            )}
          </FileButton>
        </Flex>
        <TextInput
          style={{ width: 500 }}
          mt="md"
          label="Domain"
          withAsterisk
          placeholder="Example com.deskbtm.letscollab"
          {...form.getInputProps('domain')}
        />

        <TextInput
          style={{ width: 500 }}
          mt="md"
          label="Contact email"
          withAsterisk
          {...form.getInputProps('email')}
        />
        <Button
          mt={50}
          variant="gradient"
          size="md"
          style={{ width: 500, height: 36 }}
          gradient={theme.other.buttonGradient}
          onClick={() => {}}
        >
          Create
        </Button>
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
