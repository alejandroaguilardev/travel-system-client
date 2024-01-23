import { forwardRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from '../../app/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  width?: number;
  height?: number;
  href?: string;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, href = "/", width = 100, height = 45, ...other }, ref) => {
    const theme = useTheme();
    const lightMode = theme.palette.mode === 'light';

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width,
          height,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      >
        <img
          src={lightMode
            ? "/logo/logo.png"
            : "/logo/logo_dark.png"
          }
          height="auto"
          width={150}
          alt='logo'
        />
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href={href} sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
