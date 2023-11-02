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
// import {
//   createOrgApi,
//   fetchGithubOrgApi,
//   fetchMyGithubOrgsApi,
//   isDomainRegExp,
//   isEmailRegExp,
//   isNormalStringRegExp,
//   OrgSelectProps,
//   SelectItem,
//   UploadImage,
//   useRemoveAppShellLeftPadding,
//   userProfileQueryAtom,
// } from '@letscollab/console-shared';
import { useQuery } from '@tanstack/react-query';
import { IconBrandGithub } from '@tabler/icons-react';
import { useAtom } from 'jotai';
import isEmail from 'validator/lib/isEmail';
import { useNavigate } from 'react-router-dom';
import { AvatarEditor } from '~/components/AvatarEditor';
import { isCommonLegalString } from '~/utils/validator';

export interface NewOrgProps {
  onSuccess(org: string): void;
}

export interface OrgSelectProps extends React.ComponentPropsWithoutRef<'div'> {
  logo: string;
  label: string;
  value: string;
}

const NewOrg: FC<NewOrgProps> = function ({ onSuccess }) {
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
        isCommonLegalString(value) ? null : 'Invalid organization name',
      contactEmail: (value) => (isEmail(value) ? null : 'Invalid email'),
    },
  });

  // const { data, isSuccess, isLoading } = useQuery(
  //   ['github-orgs'],
  //   fetchMyGithubOrgsApi,
  // );
  // const [_, dispatch] = useAtom(userProfileQueryAtom[0]);

  // const githubOrgs = useMemo(
  //   () =>
  //     isSuccess
  //       ? data.d.map((v) => ({
  //           logo: v.avatar_url,
  //           label: v.login,
  //           value: v.login,
  //         }))
  //       : [],
  //   [data, isSuccess],
  // );

  const handleChange = async function (e: string) {
    // const r = githubOrgs.find((v) => v.value === e);
    // if (!r) return;
    // setGithub(r);
    // form.setFieldValue('githubOrgName', r.value);
    // form.setFieldValue('name', r.value);
    // const { d } = await fetchGithubOrgApi(r.value);
    // form.setFieldValue('contactEmail', d.email);
    // form.setFieldValue('avatarUrl', d.avatar_url);
  };

  return (
    <>
      <Box style={{ maxWidth: 800 }}>
        <Title order={4}>Create your organization</Title>
        <form
          onSubmit={form.onSubmit(async (values) => {
            // const { code } = await createOrgApi(values);
            // if (code > 0) onSuccess(form.values.name);
            // Refresh the Header or other Components.
            // dispatch({ type: 'refetch' });
          })}
        >
          <Flex align="flex-end">
            <Select
              // icon={
              //   <Avatar src={github?.logo} size={14}>
              //     <IconBrandGithub size={17} />
              //   </Avatar>
              // }
              mt={16}
              label="Pick github organization"
              // itemComponent={SelectItem}
              // data={githubOrgs}
              searchable
              style={{ width: 250 }}
              maxDropdownHeight={400}
              clearable
              // nothingFound={isLoading ? 'Loading...' : 'Empty'}
              // onChange={handleChange}
            />

            <AvatarEditor
              src={github?.logo}
              croppable={true}
              confirmText="Upload"
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
            label="Contact email"
            {...form.getInputProps('contactEmail')}
          />
          <TextInput
            style={{ width: 500 }}
            mt="md"
            label="Domain"
            placeholder="e.g. indiebase.com"
            {...form.getInputProps('domain')}
          />

          <Button
            mt={50}
            variant="gradient"
            size="md"
            type="submit"
            style={{ width: 500, height: 36 }}
            gradient={theme.other.peachGradient}
          >
            Create
          </Button>
        </form>
      </Box>
    </>
  );
};

export const Component = function () {
  const navigate = useNavigate();
  // useRemoveAppShellLeftPadding();

  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box mt={40} ml={40}>
          <NewOrg
            onSuccess={(org) => {
              navigate(org, {
                state: {
                  confetti: true,
                },
              });
            }}
          />
        </Box>
        {/* <Center m={20} mt={20}>
        </Center> */}
      </Suspense>
    </ErrorBoundary>
  );
};
