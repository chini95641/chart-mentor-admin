import { forwardRef } from 'react';

import Link from '@mui/material/Link';
// import { useTheme } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    // const theme = useTheme();

    // const PRIMARY_LIGHT = theme.palette.primary.light;

    // const PRIMARY_MAIN = theme.palette.primary.main;

    // const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    const logo = (
      <Box
        /* component="img" */
        /*   src="https://avatars.slack-edge.com/2023-09-23/5924676872311_167087505a295c12e888_88.png" */
        sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
      >
        Tru
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
