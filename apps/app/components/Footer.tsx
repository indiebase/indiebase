import { Stack, Button, Typography, GlobalStyles } from '@mui/material';
import Link from 'next/link';

const alinkGlobalStyle = (
  <GlobalStyles styles={{ a: { textDecoration: 'none' } }} />
);

export const Footer = function (props) {
  return (
    <footer>
      <Stack justifyContent="center" direction="column">
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          {alinkGlobalStyle}
          <Link href="/404">皖ICP备20002736号-2</Link>

          <Typography>
            Copyright© {new Date().getFullYear()} Wang Han(Nawbc)
          </Typography>
        </Stack>
      </Stack>
    </footer>
  );
};
