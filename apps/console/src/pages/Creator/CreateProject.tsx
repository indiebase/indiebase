import { FC, forwardRef, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Loader,
  Popover,
  Text,
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

export const SelectItem = forwardRef<HTMLDivElement, any>(
  ({ value, ...rest }, ref) => {
    const theme = useMantineTheme();

    return (
      <div ref={ref} {...rest}>
        <Flex
          px={8}
          align="center"
          sx={{
            height: 36,
            borderRadius: 4,
            cursor: 'default',
            '&:hover': {
              backgroundColor: theme.colors.gray[2],
            },
          }}
          onClick={() => {}}
        >
          <Group noWrap spacing={7}>
            <Text lineClamp={1} size={14}>
              {value}
            </Text>
          </Group>
        </Flex>
      </div>
    );
  },
);

const PopupSearch: FC<{
  label?: string;
  withAsterisk?: boolean;
  initialData?: Record<string, any>;
  onSearch(content: string): void;
  dropdownData?: { label?: string; value: string }[];
  isLoading?: boolean;
  itemComponent?: React.ReactElement;
  onSelect?: (value: string, index?: number) => void;
}> = function ({
  label,
  withAsterisk,
  onSearch,
  dropdownData,
  isLoading,
  onSelect,
}) {
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
            onClick={() => setOpened(!opened)}
            icon={<IconBrandGithub size={17} />}
            onChange={(event) => setValue(event.currentTarget.value)}
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
      <Popover.Dropdown m={0} p={3}>
        {dropdownData?.map((v, index) => {
          return (
            <SelectItem
              {...v}
              onClick={() => {
                setValue(v.value);
                setOpened(false);
                onSelect?.(v.value, index);
              }}
            ></SelectItem>
          );
        })}

        {isLoading && (
          <Center style={{ height: 100 }}>
            <Loader variant="bars" size="sm" />
          </Center>
        )}
      </Popover.Dropdown>
    </Popover>
  );
};

interface SelectGithubRepoProps {
  onResult(value: any): void;
}

const SelectGithubRepo: FC<SelectGithubRepoProps> = function ({ onResult }) {
  const { org } = useParams();

  const { mutate, data, isLoading } = useMutation(
    ['search_project'],
    searchGithubProjectApi,
  );

  const items = data?.d ?? [];
  const d = items.map((v, index) => ({
    value: v.name,
    label: v.name,
    index,
  }));

  useEffect(() => {
    mutate({
      q: `org:${org}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PopupSearch
      isLoading={isLoading}
      label="Pick github repository"
      withAsterisk
      dropdownData={d}
      onSelect={(_, index) => {
        onResult?.(items[index]);
      }}
      onSearch={(content) => {
        mutate({
          q: `${content}+org:${org}`,
        });
      }}
    />
  );
};

const CreateProject: FC<CreateProjectProps> = function ({ onSuccess }) {
  const theme = useMantineTheme();
  const { org } = useParams();
  const form = useForm({
    initialValues: {
      name: '',
      contactEmail: '',
      packageName: '',
      orgName: org,
      githubRepoName: '',
    },

    validate: {
      name: (value) =>
        isNormalStringRegExp(value) ? null : 'Invalid project name',
      githubRepoName: (value) =>
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
            <SelectGithubRepo
              onResult={(value) => {
                form.setFieldValue('name', value.name);
                form.setFieldValue('githubRepoName', value.name);
              }}
            />
            <Box ml={20}>
              <UploadImage
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
            placeholder="Fallback email to notify for this project"
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
