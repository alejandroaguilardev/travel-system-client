import { Alert, Button, Link, Stack } from "@mui/material"
import { paths } from '../../../../../../app/routes/paths';
import RouterLink from '../../../../../../app/routes/components/router-link';

type Props = {
    contractId: string;
}

export const ErrorSenasaTravelDate = ({ contractId }: Props) => {
    return (
        <Stack spacing={2}>
            <Alert severity="error">Aùn no se ha Asignado la fecha de reserva</Alert>
            <Link component={RouterLink} href={paths.dashboard.contractTravel.update(contractId)}>
                < Button variant="contained" type="button" fullWidth>
                    Ir a Fase reserva para indicar la fecha del vuelo
                </Button>
            </Link>
        </Stack>
    )
}
