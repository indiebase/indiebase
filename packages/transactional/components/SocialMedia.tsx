import { Column, Img, Link, Row, Section } from '@react-email/components';

import { baseUrl } from '../constants';

const socialMediaIcon = {
  display: 'inline',
  marginLeft: '15px',
};

export function SocialMedia() {
  return (
    <Section>
      <Row>
        <Column align="right">
          <Link href="https://github.com/indiebase/indiebase">
            <Img
              alt="Github"
              style={socialMediaIcon}
              width="25"
              height="25"
              src={`${baseUrl}/static/github-mark.png`}
            ></Img>
          </Link>
        </Column>
        <Column align="right">
          <Link href="https://discord.gg/FfrNJBMk6E">
            <Img
              alt="Discord"
              style={socialMediaIcon}
              width="28"
              src={`${baseUrl}/static/discord-mark-blue.png`}
            ></Img>
          </Link>
        </Column>
        <Column align="right">
          <Link href="https://twitter.com/intent/follow?screen_name=deskbtm">
            <Img
              alt="X"
              style={socialMediaIcon}
              width="25"
              height="25"
              src={`${baseUrl}/static/x-mark.png`}
            ></Img>
          </Link>
        </Column>
      </Row>
    </Section>
  );
}
