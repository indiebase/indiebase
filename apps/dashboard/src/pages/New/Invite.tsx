import { useDebouncedState, useViewportSize } from '@mantine/hooks';
import { FC, forwardRef, Suspense, useRef, useState } from 'react';
import {
  Anchor,
  Avatar,
  Box,
  Button,
  Group,
  MultiSelect,
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

interface InviteUserProps {
  onChange(items: string[]): void;
}

export const InviteUser: FC<InviteUserProps> = function ({ onChange }) {
  const [members, setMembers] = useDebouncedState<any[]>([], 100);
  const [value, setValue] = useState([]);
  const ref = useRef<any>();
  const theme = useMantineTheme();
  const { createdName } = useParams();

  const handleSearch = debounce((query) => {
    // searchUsersApi({ email: query }).then(({ d }) => {
    //   if (d.length < 1) return;
    //   const items = d.map((val) => ({
    //     avatar: val.avatar,
    //     username: val.username,
    //     value: val.email,
    //     label: val.email,
    //   }));
    //   const result = [];
    //   for (const item of items) {
    //     if (members.length > 0) {
    //       const m = members.find((m) => item.value === m.value);
    //       if (!m) {
    //         result.push(item);
    //       }
    //     } else {
    //       result.push(item);
    //     }
    //   }
    //   setMembers([...result, ...members]);
    // });
  }, 500);

  return (
    <>
      <Stack align="flex-end" gap="sm">
        <Group align="center" gap="sm" mt={50}>
          <MultiSelect
            ref={ref}
            // filter={{}}
            // creatable
            value={value}
            onChange={(value) => {
              // setValue(value);
              onChange(value);
            }}
            limit={20}
            // getCreateLabel={(query) => `+ Invite unregister: ${query}`}
            // itemComponent={SelectItem}
            style={{
              width: 600,
            }}
            placeholder="Enter the email. Unregistered users will be sent an invitation to register."
            searchable
            clearable
            onSearchChange={handleSearch}
            // onCreate={(query) => {
            //   const item = { value: query, label: query };
            //   setMembers([...members, item]);
            //   return item;
            // }}
            data={members}
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
            gradient={theme.other.buttonGradient}
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
    <Stack>
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

      {/* <InviteUser onChange={(items) => {}} /> */}
    </Stack>
  );
};

InviteMembers.defaultProps = {
  confetti: false,
};

export const Component = function () {
  // useRemoveAppShellLeftPadding();
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box mt={40} ml={40}>
          <InviteMembers />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
