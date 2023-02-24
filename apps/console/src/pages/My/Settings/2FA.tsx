import { FC, ReactElement, Suspense, useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  generateOptApi,
  OtpCode,
  optVerifyApi,
  save,
  userProfileQueryAtom,
} from '@letscollab-community/console-utils';
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
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { IconAlertCircle, IconDiscountCheck } from '@tabler/icons';
import { useAtom } from 'jotai';

interface SetAuthnAppProps {
  onNext(code: string[]): void;
}

const SetAuthnApp: FC<SetAuthnAppProps> = function (props) {
  const { onNext } = props;
  const { data } = useQuery(['2fa-gen'], generateOptApi, {
    suspense: true,
  });
  const theme = useMantineTheme();
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>();

  const verify = useCallback(async () => {
    if (code.length < 6) {
      setErrorMsg('Enter complete code please.');
      return;
    } else {
      setErrorMsg(null);
    }

    const res = await optVerifyApi({ token: code, secret: data.d.secret });
    if (res.code < 1) {
      setErrorMsg('Two-factor code verification failed. Please try again.');
    } else {
      onNext(res.d.optRecoveryCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, data.d.secret]);

  return (
    <Box mt={15}>
      <Title order={6}>1. Scan QR code</Title>
      <Text size="sm" mt={10} color="gray">
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
      <Image width={200} src={data.d.qrcodeUri} />
      <Title order={6} mt={20}>
        2. Verify the application code
      </Title>
      <Text size="sm" mt={10} color="gray">
        Please enter your 6-digit code.
      </Text>
      <OtpCode
        groupProps={{ mt: 10, spacing: 'xs' }}
        value={code}
        rule={/^([0-9]{0,})$/}
        onChange={(val) => {
          if (val.length === 6) {
            setErrorMsg(null);
          }
          setCode(val);
        }}
        autoFocus
      />
      <div style={{ height: 20 }}>
        {errorMsg && (
          <Text size="sm" mt={5} color="red">
            {errorMsg}
          </Text>
        )}
      </div>
      <Button
        mt={10}
        variant="gradient"
        gradient={theme.other.buttonGradient}
        onClick={verify}
      >
        Verify
      </Button>
    </Box>
  );
};

const SaveRecoveryCode: FC<{ recoveryCode: string[]; onNext: () => void }> =
  function ({ recoveryCode, onNext }) {
    const theme = useMantineTheme();
    const [downloaded, setDownload] = useState(false);

    return (
      <Box mt={15}>
        <Title order={6}>Save your recovery codes</Title>
        <Text size="sm" mt={5} color="gray">
          Recovery codes are used to access your account in case you can't
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
        <Group mt={20} position="right">
          <Button
            variant="light"
            onClick={() => {
              save(location.hostname + '.txt', recoveryCode.join('\n'));
              setDownload(true);
            }}
          >
            Download
          </Button>
          <Button
            disabled={!downloaded}
            variant="gradient"
            gradient={theme.other.buttonGradient}
            onClick={onNext}
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

interface SettingTileProps {
  topBorder?: boolean;
  title: string;
  subtitle?: string;
  trailing?: ReactElement<any>;
}

const SettingTile: FC<SettingTileProps> = function ({
  topBorder,
  title,
  subtitle,
  trailing,
}) {
  const theme = useMantineTheme();

  return (
    <Group
      position="apart"
      noWrap
      spacing="xl"
      pt="sm"
      mt="sm"
      style={
        topBorder ? { borderTop: `1.5px dashed ${theme.colors.gray[3]}` } : null
      }
    >
      <div>
        <Text>{title}</Text>
        <Text size="xs" color="dimmed">
          {subtitle}
        </Text>
      </div>
      {trailing}
    </Group>
  );
};

SettingTile.defaultProps = {
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

const Complete: FC<{ onConfirm(): void }> = function ({ onConfirm }) {
  const theme = useMantineTheme();

  return (
    <>
      <SuccessAlert />
      <Group mt={20} position="right">
        <Button
          variant="gradient"
          gradient={theme.other.buttonGradient}
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </Group>
    </>
  );
};

const TwoFactorSetting: FC<SwitchesCardProps> = function () {
  const theme = useMantineTheme();

  return (
    <>
      <SuccessAlert />
      <SettingTile
        topBorder={false}
        title="Show recovery codes"
        subtitle="Recovery codes could access your account without authenticator app."
        trailing={
          <Button variant="light" onClick={() => {}}>
            Show
          </Button>
        }
      />
      <SettingTile
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
  const [active, setActive] = useState(0);
  const [recoveryCode, setRecoveryCode] = useState<string[]>();
  const [_, dispatch] = useAtom(userProfileQueryAtom[0]);

  return (
    <Stepper size="xs" mt={30} active={active}>
      <Stepper.Step label="Configure auth app">
        <SetAuthnApp
          onNext={(e) => {
            setActive(1);
            setRecoveryCode(e);
          }}
        />
      </Stepper.Step>
      <Stepper.Step label="Save recovery codes">
        <SaveRecoveryCode
          recoveryCode={recoveryCode}
          onNext={() => setActive(2)}
        />
      </Stepper.Step>
      <Stepper.Step label="Complete">
        <Complete
          onConfirm={() => {
            dispatch({ type: 'refetch' });
          }}
        />
      </Stepper.Step>
    </Stepper>
  );
};

const TwoFactorAuth = function () {
  const [profile] = useAtom(userProfileQueryAtom[0]);

  return (
    <Box style={{ maxWidth: 800 }}>
      <Title order={4}>Configure Two-factor authentication (2FA)</Title>
      {/* <CreateOptStep /> */}
      {profile.d.enabled2FA ? <TwoFactorSetting /> : <CreateOptStep />}
    </Box>
  );
};

export const TwoFactorAuthPage = function () {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box m={20} mt={10}>
          <TwoFactorAuth />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
