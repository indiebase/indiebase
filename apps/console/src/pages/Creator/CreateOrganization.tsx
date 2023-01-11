import { FC, Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Select,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  createOrgApi,
  fetchGithubOrgApi,
  fetchMyGithubOrgsApi,
  isDomainRegExp,
  isEmailRegExp,
  isNormalStringRegExp,
  OrgSelectProps,
  SelectItem,
  UploadImage,
} from '@letscollab-community/console-utils';
import { useQuery } from '@tanstack/react-query';
import { IconBrandGithub } from '@tabler/icons';
import { InviteMembers } from './InviteMembers';

export interface CreateOrganizationProps {
  onSuccess(val: boolean): void;
}

const CreateOrganization: FC<CreateOrganizationProps> = function ({
  onSuccess,
}) {
  const [github, setGithub] = useState<OrgSelectProps>();
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      name: '',
      contactEmail: '',
      domain: '',
      avatarUrl: '',
    },

    validate: {
      name: (value) =>
        isNormalStringRegExp(value) ? null : 'Invalid organization name',
      contactEmail: (value) => (isEmailRegExp(value) ? null : 'Invalid email'),
      domain: (value) => (isDomainRegExp(value) ? null : 'Invalid domain'),
    },
  });

  const { data } = useQuery(['github-orgs'], fetchMyGithubOrgsApi, {
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

  return (
    <>
      <Box style={{ maxWidth: 800 }}>
        <Title order={4}>Create your organization</Title>
        <form
          onSubmit={form.onSubmit(async (values) => {
            const { code } = await createOrgApi(values);
            if (code > 0) onSuccess(true);
          })}
        >
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
                const { d } = await fetchGithubOrgApi(r.value);
                form.setFieldValue('contactEmail', d.email);
                form.setFieldValue('avatarUrl', d.avatar_url);
              }}
            />

            <UploadImage
              src={github?.logo}
              label="Organization icon"
              onChange={(url) => {
                form.setFieldValue('avatarUrl', url);
              }}
            />
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
            {...form.getInputProps('contactEmail')}
          />
          <Button
            mt={50}
            variant="gradient"
            size="md"
            type="submit"
            style={{ width: 500, height: 36 }}
            gradient={theme.other.buttonGradient}
          >
            Create
          </Button>
        </form>
      </Box>
    </>
  );
};

export const CreateOrganizationPage = function () {
  const [state, setState] = useState(true);
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box m={20} mt={10}>
          {state ? (
            <InviteMembers confetti />
          ) : (
            <CreateOrganization onSuccess={setState} />
          )}
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
