import { Card, Stack, Avatar, Divider, ListItemText, Box, Button, Alert, Typography } from '@mui/material';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { Cage } from '../../../../modules/contracts/domain/contract-services/cage/cage';
import { useBoolean } from '../../../../hooks/use-boolean';
import Label from '../../../../components/label/label';
import { statusColor } from '../../../contracts/components/table/status-color';
import { DialogContract } from '../dialog/dialog-contract';
import { CageForm } from './form/cage-form';
import { useContractStore } from '../../../../state/contract/contract-store';
import { CagePetFound } from './cage-pet-found';
import { Pet } from '../../../../modules/pets/domain/pet';

type Props = {
    cage: Cage;
    contractId: string;
    detailId: string;
    finish: boolean;
    pet?: Pet;
};

const labelStatus = (cage: Cage, pet?: Pet): string => {

    if (!pet?.cageRecommendation?.modelCage) return "EN PROCESO";
    if (cage.status === "pending") return "DEBE INDICAR LA JAULA";
    return CONTRACT_STATUS.find(_ => _.value === cage.status)?.label ?? "PENDIENTE";
}


export default function CardCage({ pet, cage, contractId, detailId, finish }: Props) {
    const dialog = useBoolean();
    const { onSelected, onSelectedDetail } = useContractStore();

    return (
        <>
            <Card onClick={dialog.onTrue}>
                <Stack sx={{ p: 3, pb: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                            variant="rounded"
                            src="/assets/cage.png"
                            alt="jaula"
                            sx={{ width: 48, height: 48, mb: 2 }}
                        />
                        <Stack>
                            <ListItemText
                                sx={{ mb: 1 }}
                                primary="Confirma la jaula de tu mascota para el viaje" primaryTypographyProps={{
                                    typography: 'subtitle1',
                                }}
                                secondary="Asegúrese de tener la jaula correcta, con las dimensiones correcta."
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
                        <Label color={statusColor(cage.status)} width="100%" >
                            {labelStatus(cage, pet)}
                        </Label>
                    </Stack>

                    <ListItemText
                        sx={{ my: 1 }}
                        secondary={cage.status !== "completed"
                            ? "¡LA JAULA ESTÁ LISTA PARA SU USO!  LOS ELEMENTOS NECESARIOS ESTÁN EN ORDEN."
                            : "LA ESPECIFICACIÓN DE LA JAULA NECESARIA AÚN NO SE HA COMPLETADO."}
                        secondaryTypographyProps={{
                            component: 'span',
                            typography: 'caption',
                            color: 'text.disabled',
                        }}
                    />

                    <Box display="flex" justifyContent="center" my={2}>
                        {
                            cage.status === "completed" ?
                                <Alert variant='outlined' sx={{ width: "90%" }}>JAULA PREPARADA</Alert>
                                :
                                <Button variant='outlined' color="error" fullWidth sx={{ width: "90%" }}>Verificar Estado de la Jaula</Button>
                        }
                    </Box>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />
            </Card >

            {dialog.value &&
                <DialogContract
                    title='Confirma la jaula de tu mascota para el viaje'
                    open={dialog.value}
                    onClose={dialog.onFalse}
                >
                    <CagePetFound pet={pet}>
                        <CageForm
                            pet={pet!}
                            cageRecommendation={pet?.cageRecommendation}
                            onCancel={dialog.onFalse}
                            contractId={contractId}
                            cage={cage}
                            noShowButton={finish}
                            detailId={detailId}
                            callback={(response) => {
                                onSelected(response?.contract ?? null);
                                onSelectedDetail(response?.contractDetail ?? null);
                                dialog.onFalse();
                            }}
                        />
                    </CagePetFound>
                </DialogContract >
            }

        </>
    );
}