import React, { useEffect, useState } from 'react';
import {
    Typography,
    Divider,
    Card,
    CardContent,
    Stack,
    Skeleton,
} from '@mui/material';
import { useDetailInfoContext } from '../../../context/contract-detail-context';
import { fDateTimeLong } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import Label from 'src/components/label';
import { userService } from '../../../../../modules/users/infrastructure/user.service';
import { User } from '../../../../../modules/users/domain/user';

export const ContractDetailTopico: React.FC = () => {
    const { contract } = useDetailInfoContext();
    const [doctors, setDoctors] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const criteria = {
            start: 0,
            size: 10000,
            selectProperties: ["id", "profile.name", "profile.lastName"],
            filters: [{ field: "isDoctor", value: true }],
            globalFilter: "",
            globalFilterProperties: [],
            sorting: []
        };
        userService.search<User>(criteria)
            .then((data) => setDoctors(data.rows))
            .catch(() => setDoctors([]))
            .finally(() => setIsLoading(false))
    }, []);


    const userName = (userId?: string) => {
        const value = doctors.find(d => userId === d.id);
        if (value) {
            return `${value?.profile.name} ${value?.profile?.lastName ?? ""}`
        }
        return "--";
    }

    return (
        <>
            {contract.details.map((detail, index) => (
                <Card sx={{ my: 3, boxShadow: 3, borderRadius: 2 }} key={detail.id}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom color="chocolate">
                            {detail.pet?.name
                                ? `${detail.pet.name} (Microchip: ${detail.pet.chip || "No disponible"})`
                                : `Mascota número ${index + 1}: (Pendiente de admisión)`}
                        </Typography>

                        {/* <Label
                            color={statusColor(detail?.topico?.status ?? "none")}
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                p: 2,
                                mb: 1,
                                fontSize: '0.875rem',
                                width: "100%"
                            }}
                        >
                            CONDICIÓN DEL TOPICO {CONTRACT_STATUS.find(_ => _.value === detail.topico?.status)?.label}
                        </Label> */}

                        <Divider sx={{ my: 2 }} />

                        <Stack spacing={2}>
                            <Stack direction="row" spacing={2} width="100%">
                                <Card sx={{ p: 2, flex: 1 }}>
                                    <Stack spacing={2}>
                                        <Typography variant="body1">
                                            <strong>Chip </strong>
                                            <Label color={detail.topico?.chip.hasIncluded ? "info" : "secondary"} sx={{ ml: 1 }}>
                                                {detail.topico?.chip.hasIncluded ? 'Incluido' : 'No Incluido'}
                                            </Label>
                                        </Typography>
                                        {
                                            isLoading ?
                                                <Skeleton width="100%" variant='rectangular' height="20px" />
                                                :
                                                <Typography variant="body1">
                                                    <strong>Veterinario {detail.topico?.chip?.doctorProvince && ` (provincia)`}: </strong>
                                                    {detail.topico?.chip?.doctorProvince
                                                        ? detail.topico?.chip?.doctorProvince
                                                        : userName(detail.topico?.chip?.user)
                                                    }
                                                </Typography>
                                        }
                                        <Typography variant="body1">
                                            <strong>N° de Microchip:</strong> {detail.topico?.chip.description || 'Sin descripción'}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Fecha:</strong> {detail.topico?.chip.date ? fDateTimeLong(detail.topico?.chip.date) : '--'}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Observaciones:</strong> {detail.topico?.chip.observation || 'Sin observaciones'}
                                        </Typography>
                                        {detail.topico?.chip.hasIncluded && (
                                            <Typography variant="body1">
                                                <Label color={detail.topico?.chip.executed ? "success" : "secondary"} sx={{ ml: 1 }}>
                                                    {detail.topico?.chip.executed ? 'Este servicio se ha ejecutado correctamente' : 'Este servicio se encuentra pendiente por ejecutar'}
                                                </Label>
                                            </Typography>
                                        )}
                                    </Stack>
                                </Card>

                                <Card sx={{ p: 2, flex: 1 }}>
                                    <Stack spacing={2}>
                                        <Typography variant="body1">
                                            <strong>Vacunación </strong>
                                            <Label color={detail.topico?.vaccination.hasIncluded ? "info" : "secondary"} sx={{ ml: 1 }}>
                                                {detail.topico?.vaccination.hasIncluded ? 'Incluido' : 'No Incluido'}
                                            </Label>
                                        </Typography>
                                        {
                                            isLoading ?
                                                <Skeleton width="100%" variant='rectangular' height="20px" />
                                                :
                                                <Typography variant="body1">
                                                    <strong>Veterinario {detail.topico?.vaccination?.doctorProvince && ` (provincia)`}: </strong>
                                                    {detail.topico?.vaccination?.doctorProvince
                                                        ? detail.topico?.vaccination?.doctorProvince
                                                        : userName(detail.topico?.vaccination?.user)
                                                    }
                                                </Typography>
                                        }

                                        <Typography variant="body1">
                                            <strong>Fecha:</strong> {detail.topico?.vaccination.date ? fDateTimeLong(detail.topico?.vaccination.date) : '--'}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Descripción:</strong> {detail.topico?.vaccination.description || 'Sin descripción'}
                                        </Typography>
                                        {detail.topico?.vaccination.hasIncluded && (
                                            <Typography variant="body1">
                                                <Label color={detail.topico?.vaccination.executed ? "success" : "secondary"} sx={{ ml: 1 }}>
                                                    {detail.topico?.vaccination.executed ? 'Este servicio se ha ejecutado correctamente' : 'Este servicio se encuentra pendiente por ejecutar'}
                                                </Label>
                                            </Typography>
                                        )}
                                    </Stack>
                                </Card>
                            </Stack>

                            <Divider sx={{ my: 3 }} />

                            <Stack direction="row" spacing={2} width="100%">
                                <Card sx={{ p: 2, flex: 1 }}>
                                    <Stack spacing={2}>
                                        <Typography variant="body1">
                                            <strong>Vacunación de Rabia </strong>
                                            <Label color={detail.topico?.rabiesVaccination.hasIncluded ? "info" : "secondary"} sx={{ ml: 1 }}>
                                                {detail.topico?.rabiesVaccination.hasIncluded ? 'Incluido' : 'No Incluido'}
                                            </Label>
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Veterinario {detail.topico?.rabiesVaccination?.doctorProvince && ` (provincia)`}: </strong>
                                            {detail.topico?.rabiesVaccination?.doctorProvince
                                                ? detail.topico?.rabiesVaccination?.doctorProvince
                                                : userName(detail.topico?.rabiesVaccination?.user)
                                            }
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Fecha:</strong> {detail.topico?.rabiesVaccination.date ? fDateTimeLong(detail.topico?.rabiesVaccination.date) : '--'}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Observaciones:</strong> {detail.topico?.rabiesVaccination.observation || 'Sin observaciones'}
                                        </Typography>
                                        {detail.topico?.rabiesVaccination.hasIncluded && (
                                            <Typography variant="body1">
                                                <Label color={detail.topico?.rabiesVaccination.executed ? "success" : "secondary"} sx={{ ml: 1 }}>
                                                    {detail.topico?.rabiesVaccination.executed ? 'Este servicio se ha ejecutado correctamente' : 'Este servicio se encuentra pendiente por ejecutar'}
                                                </Label>
                                            </Typography>
                                        )}
                                    </Stack>
                                </Card>

                                <Card sx={{ p: 2, flex: 1 }}>
                                    <Stack spacing={2}>
                                        <Typography variant="body1">
                                            <strong>Revacunación de Rabia </strong>
                                            <Label color={detail.topico?.rabiesReVaccination.hasIncluded ? "info" : "secondary"} sx={{ ml: 1 }}>
                                                {detail.topico?.rabiesReVaccination.hasIncluded ? 'Incluido' : 'No Incluido'}
                                            </Label>
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Veterinario {detail.topico?.rabiesReVaccination?.doctorProvince && ` (provincia)`}: </strong>
                                            {detail.topico?.rabiesReVaccination?.doctorProvince
                                                ? detail.topico?.rabiesReVaccination?.doctorProvince
                                                : userName(detail.topico?.rabiesReVaccination?.user)
                                            }
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Fecha:</strong> {detail.topico?.rabiesReVaccination.date ? fDateTimeLong(detail.topico?.rabiesReVaccination.date) : '--'}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Observaciones:</strong> {detail.topico?.rabiesReVaccination.observation || 'Sin observaciones'}
                                        </Typography>
                                        {detail.topico?.rabiesReVaccination.hasIncluded && (
                                            <Typography variant="body1">
                                                <Label color={detail.topico?.rabiesReVaccination.executed ? "success" : "secondary"} sx={{ ml: 1 }}>
                                                    {detail.topico?.rabiesReVaccination.executed ? 'Este servicio se ha ejecutado correctamente' : 'Este servicio se encuentra pendiente por ejecutar'}
                                                </Label>
                                            </Typography>
                                        )}
                                    </Stack>
                                </Card>
                            </Stack>

                            <Divider sx={{ my: 3 }} />

                            <Stack direction="row" spacing={2} width="100%">
                                <Card sx={{ p: 2, flex: 1 }}>
                                    <Stack spacing={2}>
                                        <Typography variant="body1">
                                            <strong>Toma de Muestra para Test Serológico </strong>
                                            <Label color={detail.topico?.takingSampleSerologicalTest.hasIncluded ? "info" : "secondary"} sx={{ ml: 1 }}>
                                                {detail.topico?.takingSampleSerologicalTest.hasIncluded ? 'Incluido' : 'No Incluido'}
                                            </Label>
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Veterinario {detail.topico?.takingSampleSerologicalTest?.doctorProvince && ` (provincia)`}: </strong>
                                            {detail.topico?.takingSampleSerologicalTest?.doctorProvince
                                                ? detail.topico?.takingSampleSerologicalTest?.doctorProvince
                                                : userName(detail.topico?.takingSampleSerologicalTest?.user)
                                            }
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Fecha:</strong> {detail.topico?.takingSampleSerologicalTest.date ? fDateTimeLong(detail.topico?.takingSampleSerologicalTest.date) : '--'}
                                        </Typography>
                                        <Typography variant="body1">
                                            <strong>Tipo de Muestra:</strong> {detail.topico?.takingSampleSerologicalTest.typeSample || 'Sin información'}
                                        </Typography>
                                        {detail.topico?.takingSampleSerologicalTest.hasIncluded && (
                                            <Typography variant="body1">
                                                <Label color={detail.topico?.takingSampleSerologicalTest.executed ? "success" : "secondary"} sx={{ ml: 1 }}>
                                                    {detail.topico?.takingSampleSerologicalTest.executed ? 'Este servicio se ha ejecutado correctamente' : 'Este servicio se encuentra pendiente por ejecutar'}
                                                </Label>
                                            </Typography>
                                        )}
                                    </Stack>
                                </Card>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            ))}
        </>
    );
};
