import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

import { Footer } from '../../components';
import { baseUrl } from '../../constants';
import { PrimitiveEmailProps } from '../../interface';
import { dashedBorder, solidBorder, text } from '../../themes';

interface VerifyCaptchaProps extends PrimitiveEmailProps {
  verificationCode?: string;
  validityDuration?: string;
  wisher?: string;
  account?: string;
}

const main = {
  backgroundColor: '#fff',
  color: '#212121',
  margin: 0,
};

const container = {
  padding: '15px',
  margin: '0 auto',
  backgroundColor: '#f8f8f8',
  borderRadius: '4px',
  ...dashedBorder,
};

const h1 = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '15px',
};

const imageSection = {
  display: 'flex',
  padding: '20px 0',
  alignItems: 'center',
  justifyContent: 'center',
};

const coverSection = {
  backgroundColor: '#fff',
  borderRadius: '4px',
  ...solidBorder,
};

const upperSection = { padding: '0px 35px' };

const lowerSection = { padding: '25px 35px' };

const lowerSection1 = { padding: '0px 35px 25px 35px' };

const verifyText = {
  ...text,
  margin: 0,
  fontWeight: 'bold',
  textAlign: 'center' as const,
};

const codeText = {
  ...text,
  fontWeight: 'bold',
  fontSize: '36px',
  margin: '10px 0',
  textAlign: 'center' as const,
};

const validityText = {
  ...text,
  margin: '0px',
  textAlign: 'center' as const,
};

const verificationSection = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const mainText = { ...text, marginBottom: '14px' };

const cautionText = { ...text, margin: '0px' };

export default function VerifyCaptchaEmail(props?: VerifyCaptchaProps) {
  const {
    verificationCode = '596853',
    account = '',
    logo,
    links,
    service,
    socialMedia,
    validityDuration = '10 minutes',
    wisher = '',
  } = Object.assign({}, props);

  return (
    <Html>
      <Head />
      <Preview>{service!} Verification</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Link href="https://indiebase.deskbtm.com">
                <Img
                  src={`${baseUrl}/static/indiebase-mark.png`}
                  height={50}
                  alt={`${service}'s Logo`}
                />
              </Link>
            </Section>
            <Section style={upperSection}>
              <Heading style={h1}>Verify your action</Heading>
              <Text style={mainText}>
                {account ? `Hi, ${account} ` : ''}Thanks for using the {service}{' '}
                service. We want to make sure it's really you. Please enter the
                following verification code when prompted.
              </Text>
              <Section style={verificationSection}>
                <Text style={verifyText}>Verification code</Text>
                <Text style={codeText}>{verificationCode}</Text>
                {validityDuration ? (
                  <Text style={validityText}>
                    (This code is valid for {validityDuration})
                  </Text>
                ) : null}
              </Section>
            </Section>
            <Hr />
            <Section style={lowerSection}>
              <Text style={cautionText}>
                If you didn&apos;t request this email, there's nothing to worry
                about, you can safely ignore it.
              </Text>
            </Section>
            {wisher ? (
              <Section style={lowerSection1}>
                <Text style={cautionText}>Best - {wisher}</Text>
              </Section>
            ) : null}
          </Section>
          <Footer />
        </Container>
      </Body>
    </Html>
  );
}
