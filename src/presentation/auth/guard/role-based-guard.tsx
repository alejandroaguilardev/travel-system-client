import { m } from 'framer-motion';
import { Theme, SxProps } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { MotionContainer, varBounce } from 'src/components/animate';
import { useAuthContext } from '../hooks';

type RoleBasedGuardProp = {
  hasContent?: boolean;
  roles?: string[];
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export default function RoleBasedGuard({ hasContent, roles, children, sx }: RoleBasedGuardProp) {
  const { user } = useAuthContext();

  const currentRole = user ? user.roles?.map(_ => _.id) : [];
  if (typeof roles !== "undefined" && !currentRole?.some(_ => roles.includes(_))) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permiso Denegado
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Usted no tiene permiso para acceder a esta página
          </Typography>
        </m.div>

      </Container>
    ) : null;
  }

  return <> {children} </>;
}
