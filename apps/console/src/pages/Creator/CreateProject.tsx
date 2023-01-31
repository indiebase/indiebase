import { FC, Suspense, useMemo, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Popover,
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
  getOrgApi,
  isDomainRegExp,
  isEmailRegExp,
  isNormalStringRegExp,
  OrgSelectProps,
  searchGithubOrgProjectApi,
  SelectItem,
  UploadImage,
  useRemoveAppShellLeftPadding,
  userProfileQueryAtom,
} from '@letscollab-community/console-utils';
import { useQuery } from '@tanstack/react-query';
import { IconBox, IconBrandGithub, IconSearch } from '@tabler/icons';
import { InviteMembers } from './InviteMembers';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';
import debounce from 'lodash.debounce';

export interface CreateProjectProps {
  onSuccess(val: boolean): void;
}

const PopupSearch: FC<{ label?: string; withAsterisk?: boolean }> = function ({
  label,
  withAsterisk,
}) {
  const [opened, setOpened] = useState(false);

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      width={250}
      position="bottom"
      shadow="md"
    >
      <Group align="flex-end">
        <Popover.Target>
          <TextInput
            withAsterisk={withAsterisk}
            style={{ width: 250 }}
            label={label}
            icon={<IconBrandGithub size={17} />}
            onClick={() => setOpened(!opened)}
          />
        </Popover.Target>
        <ActionIcon variant="light" size={36} color="blue">
          <IconSearch size={19} />
        </ActionIcon>
      </Group>
      <Popover.Dropdown>
        <Button>demo</Button>
      </Popover.Dropdown>
    </Popover>
  );
};

// const SelectProject = function () {
//   const handleSearch = debounce((query) => {
//     searchGithubOrgProjectApi({ email: query }).then(({ d }) => {
//       if (d.length < 1) return;
//       const items = d.map((val) => ({
//         logo: val.avatar,
//         username: val.username,
//         value: val.email,
//         label: val.email,
//       }));
//       const result = [];

//       for (const item of items) {
//         if (members.length > 0) {
//           const m = members.find((m) => item.value === m.value);
//           if (!m) {
//             result.push(item);
//           }
//         } else {
//           result.push(item);
//         }
//       }

//       setMembers([...result, ...members]);
//     });
//   }, 500);

//   return (
//     <Select
//       mt={16}
//       label="Pick github repository"
//       itemComponent={SelectItem}
//       data={githubOrgs}
//       searchable
//       style={{ width: 250 }}
//       maxDropdownHeight={400}
//       clearable
//       nothingFound={'Empty'}
//       onChange={() => {}}
//       onSearchChange={handleSearch}
//     />
//   );
// };

const CreateProject: FC<CreateProjectProps> = function ({ onSuccess }) {
  const [github, setGithub] = useState<OrgSelectProps>();
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      name: '',
      contactEmail: '',
      packageName: '',
      avatarUrl: '',
      githubOrgName: '',
    },

    validate: {
      name: (value) =>
        isNormalStringRegExp(value) ? null : 'Invalid project name',
      contactEmail: (value) => (isEmailRegExp(value) ? null : 'Invalid email'),
      packageName: (value) => (isDomainRegExp(value) ? null : 'Invalid domain'),
    },
  });

  const { data, isSuccess } = useQuery(
    ['github-orgs-projects'],
    fetchMyGithubOrgsApi,
    {
      suspense: true,
    },
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
        <Title order={4}>Create your project</Title>
        <form
          onSubmit={form.onSubmit(async (values) => {
            const { code } = await createOrgApi(values);
            if (code > 0) onSuccess(true);
            // Refresh the Header or other Components.
            dispatch({ type: 'refetch' });
          })}
        >
          <Flex align="flex-end">
            <PopupSearch label="Pick github repository" withAsterisk />
            <Box ml={20}>
              <UploadImage
                src={github?.logo}
                croppable={true}
                icon={(size) => <IconBox size={size / 2 - 3} />}
                label="Project icon"
                onChange={(url) => {
                  form.setFieldValue('avatarUrl', url);
                }}
              />
            </Box>
          </Flex>
          <TextInput
            style={{ width: 500 }}
            mt={20}
            withAsterisk
            label="Project name"
            {...form.getInputProps('name')}
          />
          <TextInput
            style={{ width: 500 }}
            mt="md"
            label="Package name"
            placeholder="Example com.deskbtm.letscollab.letscollab"
            {...form.getInputProps('packageName')}
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

export const CreateProjectPage = function () {
  const [state, setState] = useState(false);
  useRemoveAppShellLeftPadding();
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Center m={20} mt={20}>
          {state ? (
            <InviteMembers confetti />
          ) : (
            <CreateProject onSuccess={setState} />
          )}
        </Center>
      </Suspense>
    </ErrorBoundary>
  );
};
