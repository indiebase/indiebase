import { fetchResourceApi } from '@letscollab/console-shared';
import { ConfirmButtonFooter } from '@letscollab/console-shared/src/components/ConfirmButtonFooter';
import {
  Box,
  Button,
  CloseButton,
  Container,
  Group,
  Modal,
  MultiSelect,
  MultiSelectValueProps,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';

interface CreateRoleModalProps {
  row?: any;
  size?: any;
  id?: number;
  updateModal?: boolean;
}

const flags = {};

function Value({
  value,
  label,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & { value: string }) {
  // const Flag = flags[value];
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          cursor: 'default',
          alignItems: 'center',
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          border: `1px solid ${
            theme.colorScheme === 'dark'
              ? theme.colors.dark[7]
              : theme.colors.gray[4]
          }`,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        <Box mr={10}>{/* <Flag /> */}</Box>
        <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}

export const CreateRoleModal: FC<CreateRoleModalProps> = function () {
  const theme = useMantineTheme();
  const [opened, setOpen] = useState<boolean>(false);

  const { data, isSuccess } = useQuery(['get_resource'], fetchResourceApi, {
    keepPreviousData: true,
    suspense: true,
  });

  const resource = isSuccess
    ? data.d.map((v) => ({
        value: v.name,
        label: v.label,
        group: v.groupLabel,
      }))
    : [];

  const form = useForm({
    initialValues: {
      name: '',
    },
    validate: {
      name: (value) =>
        /[^a-zA-Z0-9-_]/g.test(value)
          ? null
          : 'Cannot contain special characters except _-',
    },
  });

  return (
    <span>
      <Modal
        centered
        overlayColor={
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.3}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpen(false)}
        withCloseButton={false}
        shadow="unset"
        transition="pop"
        transitionDuration={200}
        transitionTimingFunction="ease"
      >
        <Container>
          <form onSubmit={form.onSubmit(() => {})}>
            <Group grow>
              <TextInput
                my={15}
                variant="filled"
                label="Name"
                placeholder="Role name."
                {...form.getInputProps('name')}
                required
              />
            </Group>

            <Textarea label="Description" placeholder="Role description." />

            <MultiSelect
              my={15}
              valueComponent={Value}
              data={resource}
              searchable
              defaultValue={['US', 'FI']}
              placeholder="Add possessions."
              label="Possession"
            />

            <ConfirmButtonFooter
              mt={80}
              type="submit"
              onCancel={() => {
                setOpen(false);
              }}
            />
          </form>
        </Container>
      </Modal>
      <Button
        size="xs"
        onClick={() => {
          setOpen(true);
        }}
        variant="gradient"
        gradient={theme.other.buttonGradient}
      >
        Add
      </Button>
    </span>
  );
};
