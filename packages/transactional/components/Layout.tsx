import { Column, Link, Row, Section, Text } from '@react-email/components';

import { link, text } from '../themes';
import { SocialMedia } from './SocialMedia';
import { PrimitiveEmailProps } from '../interface';

const footerText = {
  ...text,
  fontSize: '12px',
};

const footer = {
  padding: '20px 15px 0px 15px',
};

const socialRight = {
  width: '82%',
};

export function Footer(props: PrimitiveEmailProps) {
  return (
    <Section style={footer}>
      <Row>
        <Column style={socialRight}>
          <Link
            href="https://indiebase.deskbtm.com"
            target="_blank"
            style={link}
          >
            Docs
          </Link>
          &nbsp;&nbsp;
          <Link
            href="mailto://indiebase@deskbtm.com"
            target="_blank"
            style={link}
          >
            Contact
          </Link>
        </Column>
        <Column>
          <SocialMedia />
        </Column>
      </Row>
      <Text style={footerText}>
        © {new Date().getFullYear()} Indiebase, All rights reserved. Indiebase
        is a product of{' '}
        <Link href="https://deskbtm.com" target="_blank" style={link}>
          Deskbtm
        </Link>{' '}
        , View our{' '}
        <Link href="https://indiebase.deskbtm.com" target="_blank" style={link}>
          privacy policy
        </Link>
        .
      </Text>
    </Section>
  );
}
