import React from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableRow, Divider, useTheme, Box } from '@mui/material';
import { Role } from '../../../../modules/roles/domain/role';
import { capitalize } from '../../../../modules/shared/domain/helpers';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { PaperCustom } from '../../../../components/paper/paper-custom';

interface RoleDetailsProps {
    role: Role;
}

const RoleDetails: React.FC<RoleDetailsProps> = ({ role }) => {
    const { back } = useRouter();
    const theme = useTheme();

    return (
        <PaperCustom>
            <Typography variant="h5" gutterBottom>
                Detalles del Rol
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
                            <Typography>{role.id}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Nombre:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(role.name)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell >
                            <Typography variant="subtitle1" gutterBottom>
                                Permisos:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{role.permissions.map((_) => capitalize(_.name)).join(", ")}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Descripción:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{role.description || "--"}</Typography>
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

export default RoleDetails;
