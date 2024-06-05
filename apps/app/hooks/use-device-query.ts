import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export const useDeviceQueryValue = function ({
  desktop,
  tablet,
  mobile,
}: {
  desktop: any;
  tablet: any;
  mobile: any;
}) {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const isTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}) and (max-width: ${theme.breakpoints.xl})`,
  );
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);

  switch (true) {
    case isMobile:
      return mobile;
    case isTablet:
      return tablet;
    case isDesktop:
      return desktop;
    default:
      return undefined;
  }
};
