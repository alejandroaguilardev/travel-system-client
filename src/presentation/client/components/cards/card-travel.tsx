import { Card, Stack, Avatar, IconButton, Typography, ListItemText, Alert, Button, Box } from '@mui/material';
import usePopover from '../../../../components/custom-popover/use-popover';
import Iconify from 'src/components/iconify';
import Label from '../../../../components/label/label';
import { statusColor } from '../../../contracts/components/table/status-color';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import IconWrapper from '../../../../components/icon-wrapper/icon-wrapper';
import { TravelDefinition } from '../../../../modules/contracts/domain/interfaces/travel';
import { fDate } from '../../../../modules/shared/infrastructure/helpers/format-time';
import { TRAVEL_TYPES } from '../../../../modules/contracts/domain/travel/contract-travel';

type Props = {
    travel: TravelDefinition;
    onView: VoidFunction;
};

export default function CardTravel({ travel, onView }: Props) {
    const popover = usePopover();

    return (
        <Card>
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
                    secondary={TRAVEL_TYPES.find(_ => _.value === travel.typeTraveling)?.label}
                    secondaryTypographyProps={{
                        component: 'span',
                        typography: 'caption',
                        color: 'text.disabled',
                    }}
                />

            </Stack>

            <ListItemText
                sx={{ px: 3 }}
                primary="Información de Reserva:" primaryTypographyProps={{
                    typography: 'subtitle1',
                }}
            />
            <Box rowGap={1.5} display="grid" gridTemplateColumns="repeat(2, 1fr)" sx={{ px: 3, mb: 3 }}>
                {[
                    {
                        label: `Código ${travel?.airlineReservation?.code || "-- --"}`,
                        icon: <IconWrapper width={16} icon="code" sx={{ flexShrink: 0 }} />,
                    },
                    {
                        label: `N° ${travel?.airlineReservation?.flightNumber || "-- --"}`,
                        icon: <IconWrapper width={16} icon="number" sx={{ flexShrink: 0 }} />,
                    },
                    {
                        label: `Salida:  ${travel?.airlineReservation?.departureDate ? fDate(travel.airlineReservation.departureDate) : "-- --"}`,
                        icon: <IconWrapper width={16} icon="departure" sx={{ flexShrink: 0 }} />,
                    },
                    {
                        label: `Legada: ${travel?.airlineReservation?.departureAirport ? fDate(travel.airlineReservation.departureAirport) : "-- --"}`,
                        icon: <IconWrapper width={16} icon="arrival" sx={{ flexShrink: 0 }} />,
                    },
                ].map((item) => (
                    <Stack
                        key={item.label}
                        spacing={0.5}
                        flexShrink={0}
                        direction="row"
                        alignItems="center"
                        sx={{ color: 'text.disabled', minWidth: 0 }}
                    >
                        {item.icon}
                        <Typography variant="caption" noWrap>
                            {item.label}
                        </Typography>
                    </Stack>
                ))}
            </Box>
            <Box display="flex" justifyContent="center" my={2}>
                {
                    travel.hasServiceIncluded ?
                        <Alert variant='outlined' sx={{ width: "90%" }}>Servicio Incluido con Pet Travel</Alert>
                        :
                        <Button variant='outlined' color="primary" fullWidth sx={{ width: "90%" }}>Gestionar Reserva</Button>
                }
            </Box>
        </Card >
    );
}
