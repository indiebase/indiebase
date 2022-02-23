import { createTheme, ThemeOptions } from '@mui/material/styles';
import { colors } from './colors';

// assets

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

export const theme = () => {
  const themeOption = {
    colors,
    heading: colors.grey900,
    paper: colors.paper,
    backgroundDefault: colors.paper,
    background: colors.primaryLight,
    darkTextPrimary: colors.grey700,
    darkTextSecondary: colors.grey500,
    textDark: colors.grey900,
    menuSelected: colors.secondaryDark,
    menuSelectedBack: colors.secondaryLight,
    divider: colors.grey200,
  };

  const themeOptions: ThemeOptions = {
    direction: 'ltr',
    palette: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
