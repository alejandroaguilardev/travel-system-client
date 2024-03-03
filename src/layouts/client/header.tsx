import { useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { bgBlur } from '../..//theme/css';
import { RouterLink } from '../../app/routes/components';
import { useOffSetTop } from '../..//hooks/use-off-set-top';
import Logo from '../..//components/logo';
import { HEADER } from '../config-layout';
import HeaderShadow from '../_common/header-shadow';
import SettingsButton from '../_common/settings-button';
import { AccountPopover } from '../_common';
import { Divider, IconButton } from '@mui/material';
import IconWrapper from '../../components/icon-wrapper/icon-wrapper';
import { useAuthContext } from '../../presentation/auth/hooks/use-auth-context';
import { paths } from '../../app/routes/paths';


export default function HeaderSimple() {
  const theme = useTheme();
  const { user } = useAuthContext();
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Logo />

        <Stack direction="row" alignItems="center" spacing={1} >
          <Link href="https://wa.me/51994748870" target='_blank' rel="noopener noreferrer" component={RouterLink} color="inherit" sx={{ typography: 'subtitle2' }} display={{ xs: "none", md: "inherit" }}>
            ¿Necesitas Ayuda?
          </Link>
          {user?.roles && user?.roles?.length > 0 &&
            <Link component={RouterLink} href={paths.dashboard.root}>
              < IconButton title="Dashboard">
                <IconWrapper icon="dashboard" />
              </IconButton>
            </Link>
          }
          <SettingsButton />
          <AccountPopover />
        </Stack>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
      <Divider />
    </AppBar >
  );
}
