import { FC, Suspense, useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  generateOptApi,
  OptCode,
  optVerifyApi,
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
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { IconAlertCircle } from '@tabler/icons';

interface SetAuthnAppProps {
  onSuccess(code: string[]): void;
}

const SetAuthnApp: FC<SetAuthnAppProps> = function (props) {
  const { onSuccess } = props;
  const { data } = useQuery(['2fa-gen'], generateOptApi, {
    suspense: true,
  });
  const theme = useMantineTheme();
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState<string>();

  const verify = useCallback(async () => {
    if (code.length < 6) {
      setErrorMsg('Enter complete code please');
      return;
    } else {
      setErrorMsg(null);
    }

    const res = await optVerifyApi({ token: code, secret: data.d.secret });
    if (res.code < 1) {
      setErrorMsg('Two-factor code verification failed. Please try again.');
    } else {
      onSuccess(res.d.recoveryCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, data.d.secret]);

  return (
    <Box mt={15}>
      <Title order={6}>1. 扫描二维码</Title>
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
        2. 验证应用程序中的代码
      </Title>
      <Text size="sm" mt={10} color="gray">
        Please enter your 6-digit code.
      </Text>
      <OptCode
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

const SaveRecoveryCode: FC<{ recoveryCode: string[] }> = function () {
  const theme = useMantineTheme();

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
        align="center"
        direction="row"
        wrap="wrap"
      >
        {[
          '123122313123121312',
          '123122313123121312',
          '123122313123121312',
          '123122313123121312',
          '123122313123121312',
          '123122313123121312',
          '123122313123121312',
          '123122313123121312',
        ].map((v, i) => {
          return (
            <Text key={i} fw={500}>
              {v}
            </Text>
          );
        })}
      </Flex>
    </Box>
  );
};

const TwoFactorAuth = function () {
  const [active, setActive] = useState(1);
  const [recoveryCode, setRecoveryCode] = useState<string[]>();

  return (
    <>
      <Title order={4}>设置双因子认证 (2FA)</Title>
      <Stepper style={{ width: '800px' }} size="xs" mt={30} active={active}>
        <Stepper.Step label="设置认证应用">
          <SetAuthnApp
            onSuccess={(e) => {
              setActive(1);
              setRecoveryCode(e);
            }}
          />
        </Stepper.Step>
        <Stepper.Step label="备份Recovery Code">
          <SaveRecoveryCode recoveryCode={recoveryCode} />
        </Stepper.Step>
        <Stepper.Step label="完成" />
      </Stepper>
    </>
  );
};

export const TwoFactorAuthPage = function () {
  return (
    <ErrorBoundary fallbackRender={() => <div>Error</div>}>
      <Suspense>
        <Box m={20} mt={40}>
          <TwoFactorAuth />
        </Box>
      </Suspense>
    </ErrorBoundary>
  );
};
