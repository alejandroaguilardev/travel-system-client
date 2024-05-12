import { Card, Stack, Avatar, ListItemText, Alert, Button, Box } from '@mui/material';
import Label from '../../../../components/label/label';
import { statusColor } from '../../../contracts/components/table/status-color';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { Travel } from '../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import { useBoolean } from '../../../../hooks/use-boolean';
import { DialogContract } from '../dialog/dialog-contract';
import { TravelForm } from './form/travel-form';
import { useContractStore } from '../../../../state/contract/contract-store';
import { travelAccompaniedPetValidate } from '../../../../modules/contracts/domain/contract-services/travel/travel-accompanied-pet';
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';

type Props = {
    travel: Travel;
    contractId: string;
    detail: ContractDetail;
};

export default function CardTravel({ travel, contractId, detail }: Props) {
    const dialog = useBoolean();
    const { onSelected, onSelectedDetail, contract } = useContractStore();

    const labelStatus = (travel: Travel) => {
        const status = CONTRACT_STATUS.find(_ => _.value === travel.status);
        if (status?.value === "completed") return status.label;

        if (!travelAccompaniedPetValidate(travel.accompaniedPet)) return "Debe indicar el acompañante";
        return status?.label ?? "";
    }

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
                                primary="Confirma la reserva el viaje de tu mascota" primaryTypographyProps={{
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
                            {labelStatus(travel)}
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
            {dialog.value && contract &&
                <DialogContract
                    title='Confirma la reserva el viaje de tu mascota'
                    open={dialog.value}
                    onClose={dialog.onFalse}
                >
                    <TravelForm
                        adviser={contract?.adviser ?? null}
                        onCancel={dialog.onFalse}
                        contractId={contractId}
                        client={contract.client}
                        travel={travel}
                        detail={detail}
                        callback={(response) => {
                            onSelected(response?.contract ?? null);
                            onSelectedDetail(response?.contractDetail ?? null);
                            dialog.onFalse();
                        }}
                    />
                </DialogContract>
            }
        </>
    );
}
