import { FC, forwardRef, Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Checkbox,
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
  createProjectApi,
  isDomainRegExp,
  isEmailRegExp,
  isNormalStringRegExp,
  searchGithubProjectApi,
  UploadImage,
  useRemoveAppShellLeftPadding,
  userProfileQueryAtom,
} from '@indiebase/console-shared';
import { useMutation } from '@tanstack/react-query';
import { IconBox, IconBrandGithub, IconSearch } from '@tabler/icons';
import { useAtom } from 'jotai';
import { useNavigate, useParams } from 'react-router-dom';

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
  onFocusInput?: (value: string) => void;
}> = function ({
  label,
  withAsterisk,
  onSearch,
  dropdownData,
  isLoading,
  onSelect,
  onFocusInput,
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
            onClick={() => {
              setOpened(!opened);
              onFocusInput?.(value);
            }}
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
        {!isLoading && dropdownData?.length === 0 ? (
          <Center style={{ height: 100 }}>
            <Text size="sm" color="gray">
              Empty
            </Text>
          </Center>
        ) : (
          dropdownData.map((v, index) => {
            return (
              <SelectItem
                {...v}
                key={v.value}
                onClick={() => {
                  setValue(v.value);
                  setOpened(false);
                  onSelect?.(v.value, index);
                }}
              ></SelectItem>
            );
          })
        )}

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
      onFocusInput={(value) => {
        mutate({
          q: `${value}+org:${org}`,
        });
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
      packageName: (value) =>
        isDomainRegExp(value) || value === '' ? null : 'Invalid package name',
    },
  });

  const [_, dispatch] = useAtom(userProfileQueryAtom[0]);

  return (
    <>
      <Box style={{ maxWidth: 800 }}>
        <Title order={4}>Create your project</Title>
        <form
          onSubmit={form.onSubmit(async (values) => {
            const { code } = await createProjectApi(values);
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
                croppable
                clearable
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
            placeholder="Example com.deskbtm.indiebase, doesn't support dashes '-' "
            {...form.getInputProps('packageName')}
          />

          <TextInput
            style={{ width: 500 }}
            mt="md"
            label="Contact email"
            withAsterisk
            placeholder="Fallback email to notify for this project"
            {...form.getInputProps('contactEmail')}
          />

          <Checkbox
            pt="lg"
            label="Pinned"
            onChange={(event) => {
              form.setFieldValue('pinned', event.currentTarget.checked);
            }}
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
  const navigate = useNavigate();
  const { org } = useParams();
  useRemoveAppShellLeftPadding();
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Center m={20} mt={20}>
          <CreateProject
            onSuccess={() => {
              navigate(`/orgs/${org}`);
            }}
          />
        </Center>
      </Suspense>
    </ErrorBoundary>
  );
};
