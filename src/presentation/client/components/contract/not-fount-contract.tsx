import React from 'react';
import { m } from 'framer-motion';
import { Typography, Card, Button, Divider, Link } from '@mui/material';
import { RouterLink } from '../../../../app/routes/components';
import { paths } from '../../../../app/routes/paths';

const NotFoundContract: React.FC = () => {
    return (
        <Card sx={{ mt: 5 }}>
            <m.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{ textAlign: 'center', marginTop: '25px', marginBottom: '25px', padding: '20px' }}
            >
                <Typography variant="h4" gutterBottom style={{ margin: '20px 0' }}>
                    No tienes ningún servicio en curso.
                </Typography>
                <Typography variant="body1" paragraph>
                    Parece que no hay ningún contrato activo en este momento o el servicio ha sido finalizado.
                </Typography>
                <Typography variant="body1" paragraph>
                    Puedes regresar a la página principal o contactar con nuestro soporte técnico si necesitas asistencia.
                </Typography>
                <Divider />

                <Link component={RouterLink} href={paths.client.history}>
                    <Button variant="contained" color="primary" href="/" style={{ marginTop: '20px' }}>
                        Ver mi historial de Operaciones
                    </Button>
                </Link>
                <Link href="https://wa.me/51994748870" target='_blank' rel="noopener noreferrer" >
                    <Button variant="outlined" color="primary" style={{ marginLeft: '10px', marginTop: '20px' }}>
                        Contactar soporte técnico
                    </Button>
                </Link>
            </m.div>
        </Card >
    );
};

export default NotFoundContract;
