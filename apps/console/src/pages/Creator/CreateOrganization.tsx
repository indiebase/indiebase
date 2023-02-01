import { FC, Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Avatar,
  Box,
  Button,
  Center,
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
  useRemoveAppShellLeftPadding,
  userProfileQueryAtom,
} from '@letscollab-community/console-utils';
import { useQuery } from '@tanstack/react-query';
import { IconBrandGithub } from '@tabler/icons';
import { useAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';

export interface CreateOrganizationProps {
  onSuccess(org: string): void;
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
      githubOrgName: '',
    },

    validate: {
      name: (value) =>
        isNormalStringRegExp(value) ? null : 'Invalid organization name',
      contactEmail: (value) => (isEmailRegExp(value) ? null : 'Invalid email'),
      domain: (value) => (isDomainRegExp(value) ? null : 'Invalid domain'),
    },
  });

  const { data, isSuccess, isLoading } = useQuery(
    ['github-orgs'],
    fetchMyGithubOrgsApi,
  );
  const [_, dispatch] = useAtom(userProfileQueryAtom[0]);

  const githubOrgs = useMemo(
    () =>
      isSuccess
        ? data.d.map((v) => ({
            logo: v.avatar_url,
            label: v.login,
            value: v.login,
          }))
        : [],
    [data, isSuccess],
  );

  const handleChange = async function (e: string) {
    const r = githubOrgs.find((v) => v.value === e);
    if (!r) return;
    setGithub(r);
    form.setFieldValue('githubOrgName', r.value);
    form.setFieldValue('name', r.value);
    const { d } = await fetchGithubOrgApi(r.value);
    form.setFieldValue('contactEmail', d.email);
    form.setFieldValue('avatarUrl', d.avatar_url);
  };

  return (
    <>
      <Box style={{ maxWidth: 800 }}>
        <Title order={4}>Create your organization</Title>
        <form
          onSubmit={form.onSubmit(async (values) => {
            const { code } = await createOrgApi(values);
            if (code > 0) onSuccess(form.values.name);
            // Refresh the Header or other Components.
            dispatch({ type: 'refetch' });
          })}
        >
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
              nothingFound={isLoading ? 'Loading...' : 'Empty'}
              onChange={handleChange}
            />

            <UploadImage
              src={github?.logo}
              croppable={true}
              label="Organization icon"
              onChange={(url) => {
                form.setFieldValue('avatarUrl', url);
              }}
            />
          </Flex>
          <TextInput
            style={{ width: 500 }}
            mt={20}
            withAsterisk
            label="Organization name"
            {...form.getInputProps('name')}
          />
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
  const navigate = useNavigate();
  useRemoveAppShellLeftPadding();

  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Center m={20} mt={20}>
          <CreateOrganization
            onSuccess={(org) => {
              navigate(org, {
                state: {
                  confetti: true,
                },
              });
            }}
          />
        </Center>
      </Suspense>
    </ErrorBoundary>
  );
};
