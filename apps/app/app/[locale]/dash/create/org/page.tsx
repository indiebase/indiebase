'use client';

import { validator } from '@indiebase/app-shared';
import {
  Box,
  Button,
  Container,
  Group,
  rem,
  Select,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { isEmail, useForm } from '@mantine/form';
import { IconBrandGithub } from '@tabler/icons-react';
import { useMolecule } from 'bunshi/react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { type FC, useState } from 'react';
import { useBirth } from 'reactgets';

import { NavbarMolecule } from '~/components/Dashboard/Navbar';
import { UploadImage } from '~/components/Upload';

export interface CreateOrganizationProps {
  onSuccess(org: string): void;
}

const CreateOrganization: FC<CreateOrganizationProps> = function ({
  onSuccess,
}) {
  const [github, setGithub] = useState<any>();
  const router = useRouter();
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      name: '',
      contactEmail: '',
      avatarUrl: '',
      githubOrgName: '',
    },
    validate: {
      name: validator.isIndiebaseLegalName('Invalid organization name'),
      contactEmail: isEmail('Invalid email'),
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

  //github.com/account/organizations/new?plan=free&ref_cta=Create%2520a%2520free%2520organization&ref_loc=cards&ref_page=%2Forganizations%2Fplan
  return (
    <Container mt="xl">
      <Title order={4}>Set up your organization</Title>
      <form
        onSubmit={form.onSubmit(async (values) => {
          // const { code } = await createOrgApi(values);
          // if (code > 0) onSuccess(form.values.name);
          // Refresh the Header or other Components.
          // dispatch({ type: 'refetch' });
          router.replace('/dash/invite');
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
          mt="xl"
          withAsterisk
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
    </Container>
  );
};

export default function CreateOrganizationPage() {
  return (
    <Container size="sm">
      <CreateOrganization onSuccess={(org) => {}} />
    </Container>
  );
}
