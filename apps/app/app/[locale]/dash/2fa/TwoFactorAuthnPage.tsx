'use client';

import {
  Alert,
  Anchor,
  Box,
  Button,
  Flex,
  Group,
  Image,
  PinInput,
  Stepper,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconCheck,
  IconDiscountCheck,
} from '@tabler/icons-react';
import { atom, useAtom } from 'jotai';
import React, { type FC, memo, type ReactElement } from 'react';
import { useProps } from 'reactgets';

const stepperAtom = atom(0);
const recoveryCodeAtom = atom([]);

const InstallAuthenticatorWizard = memo(() => {
  return (
    <Text size="sm" mt={10} c="gray">
      You can use 2FA apps e.g.&nbsp;
      <Anchor component="a" href="https://googleauthenticator.net/">
        Google Authenticator,
      </Anchor>
      &nbsp;
      <Anchor
        target="_blank"
        component="a"
        href="https://www.microsoft.com/en-us/security/mobile-authenticator-app"
      >
        Microsoft Authenticator,
      </Anchor>
      &nbsp;
      <Anchor target="_blank" component="a" href="https://authy.com/">
        Authy
      </Anchor>
      &nbsp;or&nbsp;
      <Anchor target="_blank" component="a" href="https://1password.com/">
        1Password
      </Anchor>
      &nbsp;to scan the QR code.
    </Text>
  );
});

const SetAuthnApp: FC = function (props) {
  // const { data } = useQuery(['2fa-gen'], generateOptApi, {
  //   suspense: true,
  // });
  const theme = useMantineTheme();
  // const [code, setCode] = useState('');
  // const [errorMsg, setErrorMsg] = useState<string | null>();
  const [_, setActive] = useAtom(stepperAtom);
  const [__, setRecoveryCode] = useAtom(recoveryCodeAtom);

  // const verify = useCallback(async () => {
  //   if (code.length < 6) {
  //     setErrorMsg('Enter complete code please.');
  //     return;
  //   } else {
  //     setErrorMsg(null);
  //   }

  //   const res = await otpVerifyApi({ token: code, secret: data.d.secret });
  //   if (res.code < 1) {
  //     setErrorMsg('Two-factor code verification failed. Please try again.');
  //   } else {
  //     onNext(res.d.otpRecoveryCode);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [code, data.d.secret]);

  return (
    <Box mt={15}>
      <Title order={6} mt={20}>
        1. Scan the QR Code.
      </Title>
      <InstallAuthenticatorWizard />
      <Image width={200} src={''} />
      <Title order={6} mt={20}>
        2. Verify the application code.
      </Title>
      <Text size="sm" mt={10} c="gray">
        Please enter your 6-digit code.
      </Text>
      <PinInput
        mt={10}
        type={/^[0-9]+/}
        placeholder=""
        length={6}
        inputType="number"
        inputMode="numeric"
        autoFocus
        // value={code}
        // onChange={setCode}
      />
      <Box style={{ height: 20 }}>
        {/* {errorMsg && (
          <Text size="sm" mt={5} c="red">
            {errorMsg}
          </Text>
        )} */}
      </Box>
      <Button
        mt={10}
        variant="gradient"
        gradient={theme.other.peachGradient}
        onClick={() => {
          setActive(1);
        }}
      >
        Verify
      </Button>
    </Box>
  );
};

const SaveRecoveryCode: FC = function () {
  'use client';
  const theme = useMantineTheme();
  // const [downloaded, setDownload] = useState(false);
  const [_, setActive] = useAtom(stepperAtom);
  const [recoveryCode] = useAtom(recoveryCodeAtom);

  return (
    <Box mt={15}>
      <Title order={6}>Save your recovery codes</Title>
      <Text size="sm" mt={5} c="gray">
        Recovery codes are used to access your account in case you can&apos;t
        access it with your authenticator app (e.g. lost your phone).
      </Text>
      <Alert mt={10} icon={<IconAlertCircle size={18} />} color="red">
        <Title order={6}>
          Each code can only be used once. Save your 2FA recovery codes in a
          safe spot.
        </Title>
      </Alert>
      <Flex
        mt={20}
        mih={50}
        py={18}
        bg={theme.colors.gray[1]}
        gap="md"
        justify="center"
        direction="row"
        wrap="wrap"
      >
        {recoveryCode.map((v, i) => {
          return (
            <Text key={i} fw={500}>
              {v}
            </Text>
          );
        })}
      </Flex>
      <Group mt={20} justify="right">
        <Button
          variant="light"
          onClick={() => {
            // save(location.hostname + '.txt', recoveryCode.join('\n'));
            // setDownload(true);
          }}
        >
          Download
        </Button>
        <Button
          // disabled={!downloaded}
          variant="gradient"
          gradient={theme.other.peachGradient}
          onClick={() => {
            setActive(2);
          }}
        >
          Next
        </Button>
      </Group>
    </Box>
  );
};

interface PreferenceTileProps {
  topBorder?: boolean;
  title: string;
  subtitle?: string;
  trailing?: ReactElement<any>;
}

const preferenceDefaultProps = {
  topBorder: true,
};

const PreferenceTile: FC<PreferenceTileProps> = function (_props) {
  const { topBorder, title, subtitle, trailing } = useProps(
    preferenceDefaultProps,
    _props,
  );

  const theme = useMantineTheme();

  return (
    <Group
      justify="space-between"
      wrap="nowrap"
      pt="sm"
      mt="sm"
      style={
        topBorder ? { borderTop: `1.5px dashed ${theme.colors.gray[3]}` } : null
      }
    >
      <div>
        <Text>{title}</Text>
        <Text size="xs" c="dimmed">
          {subtitle}
        </Text>
      </div>
      {trailing}
    </Group>
  );
};

const SuccessAlert = () => (
  <Alert
    icon={<IconDiscountCheck size={18} />}
    title="You have enabled 2FA!"
    color="teal"
    mt={20}
    radius="xs"
  >
    Two Factor Authentication is an extra layer of protection used to ensure the
    security of online accounts beyond just a username and password.
  </Alert>
);

const Complete: FC = function () {
  const theme = useMantineTheme();
  // const [_, dispatch] = useAtom(userProfileQueryAtom[0]);

  return (
    <>
      <SuccessAlert />
      <Group mt={20} justify="right">
        <Button
          variant="gradient"
          gradient={theme.other.successGradient}
          onClick={() => {
            // dispatch({ type: 'refetch' });
          }}
        >
          Confirm
        </Button>
      </Group>
    </>
  );
};

const TwoFactorPreferences: FC = function () {
  const theme = useMantineTheme();

  return (
    <>
      <SuccessAlert />
      <PreferenceTile
        topBorder={false}
        title="Show recovery codes"
        subtitle="Recovery codes could access your account without authenticator app."
        trailing={
          <Button variant="light" onClick={() => {}}>
            Show
          </Button>
        }
      />
      <PreferenceTile
        title="Disable 2FA"
        trailing={
          <Button
            variant="gradient"
            gradient={theme.other.peachGradient}
            onClick={() => {}}
          >
            Disable
          </Button>
        }
      />
    </>
  );
};

const CreateOtpStep = function () {
  const [active] = useAtom(stepperAtom);

  return (
    <Stepper
      color="pink.5"
      size="xs"
      mt={30}
      completedIcon={<IconCheck size={20} />}
      active={active}
    >
      <Stepper.Step label="Configure auth app">
        <SetAuthnApp />
      </Stepper.Step>
      <Stepper.Step label="Save recovery codes">
        <SaveRecoveryCode />
      </Stepper.Step>
      <Stepper.Step label="Complete">
        <Complete />
      </Stepper.Step>
    </Stepper>
  );
};

export default function TwoFactorAuthnPage() {
  // const [profile] = useAtom(userProfileQueryAtom[0]);

  return (
    <Box maw={800}>
      <Title order={4}>Configure Two-factor authentication (2FA)</Title>
      {/* <CreateOtpStep /> */}
      <TwoFactorPreferences />

      {/* {profile.d.enabled2FA ? <TwoFactorPreferences /> : <CreateOtpStep />} */}
    </Box>
  );
}
