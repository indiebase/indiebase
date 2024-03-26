import {
  useDebouncedState,
  useMediaQuery,
  useViewportSize,
} from '@mantine/hooks';
import { type FC, forwardRef, Suspense, useRef, useState } from 'react';
import {
  Anchor,
  Avatar,
  Box,
  Button,
  Center,
  Combobox,
  Group,
  Stack,
  Text,
  rem,
  useMantineTheme,
} from '@mantine/core';
// import ReactConfetti from 'react-confetti';
// import {
//   searchUsersApi,
//   useRemoveAppShellLeftPadding,
// } from '@letscollab/console-shared';
import debounce from 'lodash.debounce';
import { IconBuildingCommunity } from '@tabler/icons-react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, useLocation, useParams } from 'react-router-dom';
import { InvitationInput } from '~/components/InvitationInput';
import { MultiSelect } from '~/components/MultiSelect';

export const SelectItem = forwardRef<HTMLDivElement, any>(function SelectItem(
  { avatar, label, username, ...rest },
  ref,
) {
  return (
    <div ref={ref} {...rest}>
      <Group>
        {avatar && (
          <Avatar src={avatar} radius="xl" size={18}>
            <IconBuildingCommunity size={12} />
          </Avatar>
        )}
        <Text lineClamp={1} size={rem(14)}>
          {username}
        </Text>
        <Text lineClamp={1} size="xs" c="gray">
          {label}
        </Text>
      </Group>
    </div>
  );
});

interface UserInvitationInputProps {
  onChange(items: string[]): void;
}

async function searchUsersApi(params: any) {
  // await new Promise((r) => setTimeout(r, 500));

  return [
    {
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      username: 'wanghan',
      email: 'wanghan@outlook.com',
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      username: 'deskbtm',
      email: 'deskbtm@outlook.com',
    },
  ];
}

export const UserInvitationInput: FC<UserInvitationInputProps> = function ({
  onChange,
}) {
  const [members, setMembers] = useDebouncedState<any[]>([], 0);
  const [value, setValue] = useState<any[]>([]);
  const ref = useRef<any>();
  const theme = useMantineTheme();
  const { createdName } = useParams();

  const handleSearch = debounce((query) => {
    searchUsersApi({ email: query }).then((d) => {
      if (d.length < 1) return;
      const items = d.map((val) => ({
        avatar: val.avatar,
        username: val.username,
        value: val.email,
        label: val.email,
      }));
      const result: any[] = [];
      for (const item of items) {
        if (members.length > 0) {
          const m = members.find((m) => item.value === m.value);
          if (!m) {
            result.push(item);
          }
        } else {
          result.push(item);
        }
      }
      setMembers([...result, ...members]);
    });
  }, 0);

  const isMobile = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);

  const multiSelectStyles = isMobile
    ? { width: 600 }
    : { flex: 1, width: '100dvw' };

  return (
    <>
      <Stack align="flex-end" gap="sm">
        <Group align="center" gap="sm" mt={50}>
          {/* <InvitationInput
            data={[
              { label: 'wanghan@outlook.com', value: 'wanghan@outlook.com' },
              { label: 'demodem@gmail.com', value: 'wangha1n@outlook.com' },
              { label: 'Github2', value: 'github2' },
              { label: 'Github3', value: 'github3' },
            ]}
          /> */}
          <MultiSelect
            style={multiSelectStyles}
            ref={ref}
            // hidePickedOptions
            // filter={{}}
            // creatable
            value={value}
            onChange={(value) => {
              setValue(value);
              console.log(value);
            }}
            // onClickCreateLabel={(event) => {}}
            limit={20}
            creatable
            getCreateLabel={(query) => {
              return <a>+ create</a>;
            }}
            // itemComponent={SelectItem}
            // style={{
            //   width: 600,
            // }}
            placeholder="Enter the email."
            searchable
            clearable
            // dropdownOpened
            nothingFoundMessage="Nothing found..."
            onSearchChange={handleSearch}
            // onCreate={(query) => {
            //   const item = { value: query, label: query };
            //   setMembers([...members, item]);
            //   return item;
            // }}
            // withCheckIcon={false}
            // data={members}
            data={[
              { label: 'wanghan@outlook.com', value: 'wanghan@outlook.com' },
              { label: 'demodem@gmail.com', value: 'wangha1n@outlook.com' },
              { label: 'Github2', value: 'github2' },
              { label: 'Github3', value: 'github3' },
            ]}
          />
          <Button
            variant="gradient"
            size="md"
            type="submit"
            style={{
              width: 120,
              height: 36,
              alignSelf: 'flex-start',
            }}
            gradient={theme.other.peachGradient}
          >
            Invite
          </Button>
        </Group>
        <Group>
          {createdName && (
            <Anchor
              to={`/orgs/${createdName}`}
              replace
              component={Link}
              reloadDocument={false}
              size={rem(12)}
            >
              Go Organization
            </Anchor>
          )}
          {createdName && (
            <Anchor
              to={`/orgs/${createdName}/create/project`}
              replace
              component={Link}
              reloadDocument={false}
              size={rem(12)}
            >
              Create project
            </Anchor>
          )}
        </Group>
      </Stack>
    </>
  );
};

export const InviteMembers = function () {
  // const { height, width } = useViewportSize();
  // const { state } = useLocation();

  return (
    <Stack align="center">
      {/* <ReactConfetti
        width={width - 16}
        height={height}
        run={state?.confetti}
        recycle={false}
        numberOfPieces={300}
        wind={0}
        gravity={0.1}
        style={{
          zIndex: 999,
        }}
        initialVelocityX={2}
        initialVelocityY={5}
        opacity={1}
      /> */}

      <Text
        variant="gradient"
        gradient={{ from: '#018d63', to: 'lime', deg: 45 }}
        fw={700}
        size={rem(32)}
      >
        Create Organization Successfully !
      </Text>

      <Text mt={20} fw={400} size={rem(21)}>
        Now, invite some members.
      </Text>

      <UserInvitationInput onChange={(items) => {}} />
    </Stack>
  );
};

InviteMembers.defaultProps = {
  confetti: false,
};

export const Component = function () {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Center mt={40}>
          <InviteMembers />
        </Center>
      </Suspense>
    </ErrorBoundary>
  );
};
