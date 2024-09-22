import React from 'react';
import { Typography, Divider, Card, CardContent, Stack } from '@mui/material';
import { useDetailInfoContext } from '../../../context/contract-detail-context';
import { fDateTimeLong } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { PET_GENDERS } from '../../../../../modules/pets/domain/pet-gender';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';

export const ContractDetailPet: React.FC = () => {
    const { contract } = useDetailInfoContext();

    return (
        <>
            {contract.details.map((detail, index) => (
                <Card sx={{ my: 3, boxShadow: 3, borderRadius: 2 }} key={detail.id}>
                    <CardContent>
                        <Typography
                            variant="h6"
                            gutterBottom
                            color="chocolate"
                        >
                            {detail.pet?.name
                                ? `${detail.pet.name} (Microchip: ${detail.pet.chip || "No disponible"})`
                                : `Mascota número ${index + 1}: (Pendiente de admisión)`}
                        </Typography>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Nombre:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail.pet?.name || '--'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Raza:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail.pet?.race || '--'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Género:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail?.pet?.gender ? PET_GENDERS[detail?.pet?.gender] : '--'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Fecha de Nacimiento:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail.pet?.birthDate ? fDateTimeLong(detail.pet.birthDate) : '--'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Chip:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail.pet?.chip || '--'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Fecha de Colocación del Chip:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail.pet?.chipDate ? fDateTimeLong(detail.pet.chipDate) : '--'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Color:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {capitalize(detail.pet?.color) || '--'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>País:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail.pet?.country || '--'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Tipo:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail.pet?.type || '--'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Esterilizado:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail.pet?.sterilized || '--'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Potencialmente Peligroso:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail.pet?.isPotentiallyDangerous ? 'Sí' : 'No'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Braquicéfalo:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail.pet?.isBrachycephalic ? 'Sí' : 'No'}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />


                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Altura:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail?.pet?.measurementsAndWeight?.height ?? 0} cm
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Ancho:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail?.pet?.measurementsAndWeight?.width ?? 0} cm
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Largo:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail?.pet?.measurementsAndWeight?.length ?? 0} cm
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography variant="body1" sx={{ width: "50%" }}>
                                <strong>Peso:</strong>
                            </Typography>
                            <Typography variant="body1">
                                {detail?.pet?.measurementsAndWeight?.weight ?? 0} kg
                            </Typography>
                        </Stack>

                    </CardContent>
                    <Divider sx={{ my: 2 }} />
                </Card>
            ))}
        </>
    );
};
