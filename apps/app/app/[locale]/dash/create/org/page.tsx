'use client';

import { validator } from '@indiebase/app-shared';
import {
  Button,
  Container,
  Group,
  rem,
  Select,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { IconBrandGithub } from '@tabler/icons-react';
import { type FC, useState } from 'react';

import { UploadImage } from '~/components/Upload';

export interface CreateOrganizationProps {
  onSuccess(org: string): void;
}

const CreateOrganization: FC<CreateOrganizationProps> = function ({
  onSuccess,
}) {
  const [github, setGithub] = useState<any>();
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
      name: validator.isIndiebaseLegalName('Invalid organization name'),
      contactEmail: isEmail('Invalid email'),
      domain: validator.isDomain('Invalid domain'),
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
      <Title order={4}>Create your organization</Title>
      <form
        onSubmit={form.onSubmit(async (values) => {
          // const { code } = await createOrgApi(values);
          // if (code > 0) onSuccess(form.values.name);
          // Refresh the Header or other Components.
          // dispatch({ type: 'refetch' });
        })}
      >
        <Group mt="lg" align="center">
          <Select
            withAsterisk
            leftSection={<IconBrandGithub size={17} />}
            label="Pick github organization"
            data={[]}
            searchable
            maxDropdownHeight={rem(450)}
            clearable
            nothingFoundMessage="Nothing found..."
            onChange={handleChange}
            mr={40}
          />
          <UploadImage
            editable
            src={github?.logo}
            label="Organization icon"
            onChange={(url) => {
              form.setFieldValue('avatarUrl', url);
            }}
          />
        </Group>

        <TextInput
          mt="md"
          withAsterisk
          label="Organization name"
          {...form.getInputProps('name')}
        />

        <TextInput
          mt="md"
          label="Domain"
          placeholder="Example com.deskbtm.letscollab"
          {...form.getInputProps('domain')}
        />

        <TextInput
          mt="md"
          label="Contact email"
          {...form.getInputProps('contactEmail')}
        />
        <Button
          mt={50}
          w="23%"
          variant="gradient"
          size="sm"
          type="submit"
          gradient={theme.other.gradients.peach}
        >
          Create
        </Button>
      </form>
    </>
  );
};

export default function CreateOrganizationPage() {
  return (
    <Container size="sm">
      <CreateOrganization onSuccess={(org) => {}} />
    </Container>
  );
}
