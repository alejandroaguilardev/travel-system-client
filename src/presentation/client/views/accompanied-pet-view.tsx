import { useState } from 'react';
import { Alert, Box, Container, Typography } from '@mui/material';
import { AccompaniedForm } from '../components/accompanied-form/accompanied-form';
import { HeadLogin } from '../../auth/components/head-login';
import { useSearchByIdContractDetail } from '../../contracts/hooks/use-search-by-id-contract.-detail';
import Button from '@mui/material/Button';
import RouterLink from '../../../app/routes/components/router-link';
import { LoadingScreen } from '../../../components/loading-screen';
import { NotFoundView } from '../../../presentation/error';

type Props = {
    contractId: string;
    contractDetailId: string;
    token: string;
}

export default function AccompaniedPetView({ contractId, contractDetailId, token }: Props) {
    const [isUpdate, setIsUpdate] = useState(false);

    const { isLoading, contractDetail } = useSearchByIdContractDetail(contractId, contractDetailId, token);

    if (isLoading) return <LoadingScreen />
    if (!contractDetail) return <NotFoundView />


    return (
        <Container maxWidth="md" sx={{ my: 5 }}>
            <HeadLogin title=" Rellene el Formulario de los datos del Acompañante" />

            {isUpdate
                ? <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
                    bgcolor="white"
                >
                    <Alert severity="success" sx={{ mb: 2 }}>
                        ¡Actualización Exitosa!
                    </Alert>
                    <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                        Los datos del acompañante se han actualizado con éxito en nuestro sistema. Agradecemos tu colaboración y estamos aquí para ayudarte en caso de alguna pregunta o inquietud.
                    </Typography>
                    <Button
                        component={RouterLink}
                        href="/"
                        size="large"
                        variant="contained"
                        sx={{ textAlign: 'center' }}
                    >
                        Ir a la página de inicio
                    </Button>
                </Box>
                : <>
                    <AccompaniedForm
                        travel={contractDetail?.travel}
                        contractId={contractId}
                        contractDetailId={contractDetailId}
                        callback={() => setIsUpdate(true)}
                    />
                </>
            }
        </Container >
    );
}
