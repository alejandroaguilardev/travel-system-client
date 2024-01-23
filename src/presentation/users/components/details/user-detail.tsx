import React from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableRow, Divider, useTheme, Box } from '@mui/material';
import { User } from '../../../../modules/users/domain/user';
import { capitalize } from '../../../../modules/shared/domain/helpers';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { PaperCustom } from '../../../../components/paper/paper-custom';

interface UserDetailsProps {
    user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
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
                            <Typography>{user.id}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Nombres:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(user.name)} {capitalize(user.secondName)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Apellidos:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(user.lastName)} {capitalize(user.secondLastName)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Apellidos:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(user.email)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell >
                            <Typography variant="subtitle1" gutterBottom>
                                Roles:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{user.roles.map((_) => capitalize(_.name)).join(", ")}</Typography>
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

export default UserDetails;
