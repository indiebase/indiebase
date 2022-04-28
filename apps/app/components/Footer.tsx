import { Stack, Button, Typography, GlobalStyles } from '@mui/material';
import Link from 'next/link';

export const Footer = function (props) {
  return (
    <footer>
      <Stack justifyContent="center" direction="column">
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Link href="/">皖ICP备20002736号-2</Link>
          <Typography>Copyright© {new Date().getFullYear()} WangHan</Typography>
        </Stack>
      </Stack>
    </footer>
  );
};
