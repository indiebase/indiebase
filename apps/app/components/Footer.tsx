import { Stack, Button, Typography } from '@mui/material';
import Link from 'next/link';
import Box from '@mui/material/Box';

export const Footer = function (props) {
  return (
    <footer
      style={{
        marginBottom: '40px',
      }}
    >
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
