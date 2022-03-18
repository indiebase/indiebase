import { createTheme, ThemeOptions } from '@mui/material/styles';
import { colors } from './colors';
import themeComponents from './components';
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
        minHeight: '62px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '62px',
        },
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 768,
        md: 992,
        lg: 1200,
        xl: 1920,
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = themeComponents(themeOption);

  return themes;
};

export default theme;
