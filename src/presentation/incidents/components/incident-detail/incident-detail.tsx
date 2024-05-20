import { FC } from 'react';
import { Incident } from '../../../../modules/incidents/domain/incident';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { fDateTime } from '../../../../modules/shared/infrastructure/helpers/format-time';

type Props = {
    incident: Incident;
}

export const IncidentDetail: FC<Props> = ({ incident }) => {
    return (
        <Box>
            <Typography fontWeight="bold" textAlign="center" mb={2}>Error: {incident.id}</Typography>
            <Divider />
            <Stack mb={1}>
                <Typography fontWeight="bold">Nombre:</Typography>
                <code style={{
                    wordBreak: "break-word"
                }}>
                    {incident.name}
                </code>
            </Stack>
            <Stack mb={1}>
                <Typography fontWeight="bold">Fecha:</Typography>
                <Typography>Date{fDateTime(incident.date_error)}</Typography>
            </Stack>
            {
                incident.body !== "{}" &&
                <Stack mb={1}>
                    <Typography fontWeight="bold">Cuerpo de la petición</Typography>
                    <code style={{
                        wordBreak: "break-word"
                    }}>
                        {incident.body}
                    </code>
                </Stack>
            }
            <Stack mb={2}>
                <Typography fontWeight="bold">Error</Typography>
                <code style={{
                    wordBreak: "break-word"
                }}>
                    {incident.error}
                </code>
            </Stack>
        </Box>
    )
}
