import React from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableRow, Divider, useTheme, Box } from '@mui/material';
import { User } from '../../../../modules/users/domain/user';
import { capitalize } from '../../../../modules/shared/domain/helpers';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { PaperCustom } from '../../../../components/paper/paper-custom';
import { userGenders } from '../../../../modules/users/domain/user-gender';
import { fDate } from '../../../../modules/shared/infrastructure/helpers/format-time';

interface UserDetailsProps {
    user: User;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    const { back } = useRouter();
    const theme = useTheme();

    return (
        <PaperCustom>
            <Typography variant="h5" gutterBottom>
                Detalles del usuario
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
                            <Typography>{capitalize(user.profile.name)} {capitalize(user.profile.secondName)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Apellidos:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(user.profile.lastName)} {capitalize(user.profile.secondLastName)}</Typography>
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
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Teléfono:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{user.profile.phone}</Typography>
                        </TableCell>
                    </TableRow>

                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Sexo:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{user?.profile?.gender
                                ? userGenders[user.profile.gender]
                                : "No definido"
                            }</Typography>
                        </TableCell>
                    </TableRow>

                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Fecha de nacimiento:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>
                                {
                                    user?.profile?.birthDate
                                        ? fDate(user.profile.birthDate)
                                        : "--"
                                }
                            </Typography>
                        </TableCell>
                    </TableRow>

                    {user.roles && user.roles.length > 0 &&
                        <TableRow hover component="th" scope="row">
                            <TableCell >
                                <Typography variant="subtitle1" gutterBottom>
                                    Roles:
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>{user.roles.map((_) => capitalize(_.name)).join(", ")}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    }
                    <TableRow hover component="th" scope="row">
                        <TableCell >
                            <Typography variant="subtitle1" gutterBottom>
                                Administrador:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{user.auth?.admin ? "Si" : "No"} </Typography>
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
