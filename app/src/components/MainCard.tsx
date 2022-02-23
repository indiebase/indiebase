import { FC, forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

export interface MainCardProps {
  border?: boolean;
  boxShadow?: any;
  children?: any;
  content?: boolean;
  contentClass?: string;
  contentSX?: {};
  darkTitle?: string;
  secondary?: string;
  shadow?: string;
  sx?: {};
  title?: string;
  [key: string]: any;
}

export const MainCard: FC<MainCardProps> = forwardRef(
  (
    {
      border,
      boxShadow,
      children,
      content,
      contentClass,
      contentSX,
      darkTitle,
      secondary,
      shadow,
      sx,
      title,
      ...others
    },
    ref,
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref as any}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 75,
          ':hover': {
            boxShadow: boxShadow
              ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)'
              : 'inherit',
          },
          ...sx,
        }}
      >
        {!darkTitle && title && (
          <CardHeader sx={headerSX} title={title} action={secondary} />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={headerSX}
            title={<Typography variant="h3">{title}</Typography>}
            action={secondary}
          />
        )}

        {title && <Divider />}

        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  },
);

MainCard.defaultProps = {
  border: true,
  content: true,
  contentClass: '',
  sx: {},
  contentSX: {},
};
