import React from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableRow, Divider, useTheme, Box } from '@mui/material';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { Permission } from '../../../../modules/permissions/domain/permission';
import { PaperCustom } from '../../../../components/paper/paper-custom';
import { capitalize } from '../../../../modules/shared/domain/helpers';

interface PermissionDetailsProps {
    permission: Permission;
}

const PermissionDetails: React.FC<PermissionDetailsProps> = ({ permission }) => {
    const { back } = useRouter();
    const theme = useTheme();

    return (
        <PaperCustom>
            <Typography variant="h5" gutterBottom>
                Detalles del Permiso
            </Typography>
            <Divider sx={{ marginBottom: theme.spacing(2) }} />

            <Table>
                <TableBody>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Identificador:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{permission.id}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Nombre:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(permission.name)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell >
                            <Typography variant="subtitle1" gutterBottom>
                                Grupo:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(permission.group)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Descripción:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{permission.description || "--"}</Typography>
                        </TableCell>
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

export default PermissionDetails;
