import {
  Box,
  Stepper,
  Title,
  useMantineTheme,
  Text,
  Anchor,
  Image,
  Button,
  Alert,
  Flex,
  Group,
  PinInput,
} from '@mantine/core';
import { atom, useAtom } from 'jotai';
import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import {
  IconAlertCircle,
  IconCheck,
  IconDiscountCheck,
  IconUserCheck,
} from '@tabler/icons-react';
import { FC, ReactElement, Suspense, useCallback, useState } from 'react';
import { UploadImageZone } from '@/components/UploadImageZone';
import { req } from '@/__MOCK__';

const _optStepperAtom = atom(0);
const _optRecoveryCodeAtom = atom([]);

export const generateOptApi = async () => {
  const { data } = await req.post('/v1/auth/2fa');
  return data;
};

export const optVerifyApi = async (params: any) => {
  const { data } = await req.post('/v1/auth/2fa/verify', params);
  return data;
};

const SetAuthnApp: FC = function (props) {
  // const { data } = useQuery(['2fa-gen'], generateOptApi, {
  //   suspense: true,
  // });
  const theme = useMantineTheme();
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>();
  const [_, setActive] = useAtom(_optStepperAtom);
  const [__, setRecoveryCode] = useAtom(_optRecoveryCodeAtom);

  // const verify = useCallback(async () => {
  //   if (code.length < 6) {
  //     setErrorMsg('Enter complete code please.');
  //     return;
  //   } else {
  //     setErrorMsg(null);
  //   }

  //   const res = await optVerifyApi({ token: code, secret: data.d.secret });
  //   if (res.code < 1) {
  //     setErrorMsg('Two-factor code verification failed. Please try again.');
  //   } else {
  //     onNext(res.d.optRecoveryCode);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [code, data.d.secret]);

  const Tip = () => (
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

  return (
    <Box mt={15}>
      <Title order={6} mt={20}>
        1. Scan the QR Code.
      </Title>
      <Tip />
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
        value={code}
        onChange={setCode}
      />
      <Box style={{ height: 20 }}>
        {errorMsg && (
          <Text size="sm" mt={5} c="red">
            {errorMsg}
          </Text>
        )}
      </Box>
      <Button
        mt={10}
        variant="gradient"
        gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
        // onClick={verify}
        onClick={() => {
          setActive(1);
        }}
      >
        Verify
      </Button>
    </Box>
  );
};

const SaveRecoveryCode: FC<{ recoveryCode: string[] }> = function ({
  recoveryCode,
}) {
  const theme = useMantineTheme();
  const [downloaded, setDownload] = useState(false);
  const [_, setActive] = useAtom(_optStepperAtom);

  return (
    <Box mt={15}>
      <Title order={6}>Save your recovery codes</Title>
      <Text size="sm" mt={5} color="gray">
        Recovery codes are used to access your account in case you can't access
        it with your authenticator app (e.g. lost your phone).
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
            setDownload(true);
          }}
        >
          Download
        </Button>
        <Button
          // disabled={!downloaded}
          variant="gradient"
          gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
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

SaveRecoveryCode.defaultProps = {
  recoveryCode: [],
};

interface SwitchesCardProps {}

interface PreferenceTileProps {
  topBorder?: boolean;
  title: string;
  subtitle?: string;
  trailing?: ReactElement<any>;
}

const PreferenceTile: FC<PreferenceTileProps> = function ({
  topBorder,
  title,
  subtitle,
  trailing,
}) {
  const theme = useMantineTheme();

  return (
    <Group
      justify="space-between"
      // spacing="xl"
      wrap="nowrap"
      pt="sm"
      mt="sm"
      // style={
      //   topBorder ? { borderTop: `1.5px dashed ${theme.colors.gray[3]}` } : null
      // }
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

PreferenceTile.defaultProps = {
  topBorder: true,
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
          gradient={theme.other.buttonGradient}
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

const TwoFactorPreferences: FC<SwitchesCardProps> = function () {
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
            gradient={theme.other.buttonGradient}
            onClick={() => {}}
          >
            Disable
          </Button>
        }
      />
    </>
  );
};

const CreateOptStep = function () {
  const [active] = useAtom(_optStepperAtom);

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
        <SaveRecoveryCode recoveryCode={['12']} />
      </Stepper.Step>
      <Stepper.Step label="Complete">
        <Complete />
      </Stepper.Step>
    </Stepper>
  );
};

const TwoFactorAuth = function () {
  // const [profile] = useAtom(userProfileQueryAtom[0]);

  return (
    <Box style={{ maxWidth: 800 }}>
      <Title order={4}>Configure Two-factor authentication (2FA)</Title>
      <CreateOptStep />

      {/* {profile.d.enabled2FA ? <TwoFactorPreferences /> : <CreateOptStep />} */}
    </Box>
  );
};

export const Component = function () {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box m={40}>
          <TwoFactorAuth />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
