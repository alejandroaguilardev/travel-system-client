import { Card, Stack, Avatar, ListItemText, Alert, Button, Box } from '@mui/material';
import Label from '../../../../components/label/label';
import { statusColor } from '../../../contracts/components/table/status-color';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { Travel } from '../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import { useBoolean } from '../../../../hooks/use-boolean';
import { DialogContract } from '../dialog/dialog-contract';
import { TravelForm } from './form/travel-form';

type Props = {
    travel: Travel;
    contractId: string;
};

export default function CardTravel({ travel, contractId }: Props) {
    const dialog = useBoolean();

    return (
        <>
            <Card onClick={dialog.onTrue}>
                <Stack sx={{ p: 3, pb: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                            variant="rounded"
                            src="/assets/travel.png"
                            alt="viaje"
                            sx={{ width: 48, height: 48, mb: 2 }}
                        />
                        <Stack>
                            <ListItemText
                                sx={{ mb: 1 }}
                                primary="Requisitos de Viaje" primaryTypographyProps={{
                                    typography: 'subtitle1',
                                }}
                                secondary="Asegúrese de tener todos los elementos necesarios para viajar"
                                secondaryTypographyProps={{
                                    component: 'span',
                                    typography: 'caption',
                                    color: 'text.disabled',
                                }}
                            />
                        </Stack>

                    </Stack>
                    <Stack
                        spacing={0.5}
                        direction="row"
                        alignItems="center"
                        sx={{ color: 'primary.main', typography: 'caption' }}
                    >
                        <Label color={statusColor(travel.status)} width="100%" >
                            {CONTRACT_STATUS.find(_ => _.value === travel.status)?.label}
                        </Label>
                    </Stack>

                    <ListItemText
                        sx={{ my: 1 }}
                        secondary={travel.status === "completed"
                            ? "¡TODO LISTO PARA EL SIGUIENTE PASO! CONFIRME LOS DETALLES Y ¡GRACIAS POR PREPARARSE!"
                            : "FALTAN DETALLES IMPORTANTES PARA SU VIAJE. POR FAVOR, PROPORCIONE LA INFORMACIÓN."}
                        secondaryTypographyProps={{
                            component: 'span',
                            typography: 'caption',
                            color: 'text.disabled',
                        }}
                    />

                    <Box display="flex" justifyContent="center" my={2}>
                        {
                            travel.status === "completed" ?
                                <Alert variant='outlined'>DETALLES CONFIRMADOS</Alert>
                                :
                                <Button variant='outlined' color="error" fullWidth>Revisar Detalles del Viaje</Button>
                        }
                    </Box>
                </Stack>


            </Card>
            {dialog.value &&
                <DialogContract
                    title='Requisitos de viaje'
                    open={dialog.value}
                    onClose={dialog.onFalse}
                >
                    <TravelForm
                        onCancel={dialog.onFalse}
                        contractId={contractId}
                        travel={travel}
                        readonly={travel.hasServiceIncluded}
                    />

                </DialogContract>
            }
        </>
    );
}
