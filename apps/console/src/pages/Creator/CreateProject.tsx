import { FC, Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Popover,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  createOrgApi,
  isDomainRegExp,
  isEmailRegExp,
  isNormalStringRegExp,
  OrgSelectProps,
  searchGithubProjectApi,
  UploadImage,
  useRemoveAppShellLeftPadding,
  userProfileQueryAtom,
} from '@letscollab-community/console-utils';
import { useMutation } from '@tanstack/react-query';
import { IconBox, IconBrandGithub, IconSearch } from '@tabler/icons';
import { InviteMembers } from './InviteMembers';
import { useAtom } from 'jotai';
import { useParams } from 'react-router-dom';

export interface CreateProjectProps {
  onSuccess(val: boolean): void;
}

const PopupSearch: FC<{
  label?: string;
  withAsterisk?: boolean;
  initialData?: Record<string, any>;
  onSearch(content: string): void;
  dropdownData?: Record<string, any>[];
}> = function ({ label, withAsterisk, onSearch, dropdownData }) {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');

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
            value={value}
            withAsterisk={withAsterisk}
            style={{ width: 250 }}
            label={label}
            icon={<IconBrandGithub size={17} />}
            onChange={(event) => setValue(event.currentTarget.value)}
            onClick={() => setOpened(!opened)}
          />
        </Popover.Target>
        <ActionIcon
          variant="light"
          size={36}
          color="blue"
          onClick={() => {
            setOpened(true);
            onSearch(value);
          }}
        >
          <IconSearch size={19} />
        </ActionIcon>
      </Group>
      <Popover.Dropdown>
        {dropdownData?.map((value) => {
          return <div></div>;
        })}
      </Popover.Dropdown>
    </Popover>
  );
};

const SelectGithubRepo = function () {
  const { org } = useParams();

  const { mutate, data } = useMutation(
    ['search_project'],
    searchGithubProjectApi,
  );

  const items = data?.d?.items.map(() => {});

  return (
    <PopupSearch
      label="Pick github repository"
      withAsterisk
      dropdownData={items ?? []}
      onSearch={(content) => {
        mutate({
          q: `${content}+org:${org}`,
        });
      }}
    />
  );
};

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

  const [_, dispatch] = useAtom(userProfileQueryAtom[0]);

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
            <SelectGithubRepo />
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
