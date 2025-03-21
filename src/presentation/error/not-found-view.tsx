import { m } from 'framer-motion';
import { Box, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { RouterLink } from '../../app/routes/components';
import MotionContainer from '../../components/animate/motion-container';
import { varBounce } from '../../components/animate/variants/bounce';
import { useAuthContext } from '../auth/hooks';
import { PATH_AFTER_LOGIN, PATH_AFTER_LOGIN_CLIENT } from '../../app/config/config-global';

export default function NotFoundView() {

  const { user } = useAuthContext();
  const route = user && user?.roles?.length > 0 ? PATH_AFTER_LOGIN : PATH_AFTER_LOGIN_CLIENT;

  return (
    <MotionContainer>
      <m.div variants={varBounce().in} >
        <Typography variant="h3" sx={{ mb: 2, textAlign: 'center', mt: 10 }}>
          ¡Lo siento, página no encontrada!
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ textAlign: 'center', color: 'text.secondary', mb: 5 }}>
          Lo sentimos, no pudimos encontrar la página que estás buscando. ¿Quizás has escrito mal la URL? Asegúrate de revisar la ortografía.
        </Typography>
      </m.div>
      <Divider />
      <Box display="flex" justifyContent="center">
        <m.div variants={varBounce().in}>
          <Button component={RouterLink}
            href={user ? route : "/auth/login"}

            size="large" variant="contained" sx={{ textAlign: 'center', mt: 2 }}>
            Ir a la página de inicio
          </Button>
        </m.div>
      </Box>
    </MotionContainer>
  );
}
