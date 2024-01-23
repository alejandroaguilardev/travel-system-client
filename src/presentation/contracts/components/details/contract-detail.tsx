import React from 'react';
import {
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Divider,
    useTheme,
    Box,
} from '@mui/material';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { capitalize } from '../../../../modules/shared/domain/helpers';
import { PaperCustom } from '../../../../components/paper/paper-custom';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';

interface ContractDetailsProps {
    contract: Contract;
}

const ContractDetails: React.FC<ContractDetailsProps> = ({ contract }) => {
    const { back } = useRouter();
    const theme = useTheme();

    return (
        <PaperCustom>
            <Typography variant="h5" gutterBottom>
                Detalles del Contrato
            </Typography>
            <Divider sx={{ marginBottom: theme.spacing(2) }} />

            <Table>
                <TableBody>
                    <TableRow hover>
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Identificador:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{contract.id}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover>
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Número de Contrato:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(contract.number)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover>
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Cliente:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{"contract.client"}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover>
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Estado:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <TableCell>{CONTRACT_STATUS.find(_ => _.value === contract.status)?.label}</TableCell>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Divider sx={{ marginY: theme.spacing(2) }} />

            <Typography variant="subtitle1" gutterBottom >
                Servicio de Documentación
            </Typography>
            <Table>
                <TableBody>
                    <TableRow hover>
                        <TableCell>Estado:</TableCell>
                        <TableCell>{CONTRACT_STATUS.find(_ => _.value === contract.services.documentation.status)?.label}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Divider sx={{ marginY: theme.spacing(2) }} />

            <Typography variant="subtitle1" gutterBottom>
                Servicio de Jaula
            </Typography>
            <Table>
                <TableBody>
                    <TableRow hover>
                        <TableCell>Estado:</TableCell>
                        <TableCell>{CONTRACT_STATUS.find(_ => _.value === contract.services.cage.status)?.label}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Divider sx={{ marginY: theme.spacing(2) }} />

            <Typography variant="subtitle1" gutterBottom>
                Servicio de Viaje
            </Typography>
            <Table>
                <TableBody>
                    <TableRow hover>
                        <TableCell>Estado:</TableCell>
                        <TableCell>{CONTRACT_STATUS.find(_ => _.value === contract.services.travel.status)?.label}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Divider sx={{ marginY: theme.spacing(2) }} />

            <Box width="100%" display="flex" justifyContent="center">
                <Button variant="outlined" onClick={back}>
                    Volver Atrás
                </Button>
            </Box>
        </PaperCustom>
    );
};

export default ContractDetails;
