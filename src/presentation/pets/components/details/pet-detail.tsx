import React from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableRow, Divider, useTheme, Box } from '@mui/material';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { Pet } from '../../../../modules/pets/domain/pet';
import { PaperCustom } from '../../../../components/paper/paper-custom';
import { capitalize } from '../../../../modules/shared/domain/helpers';
import { fDate } from '../../../../modules/shared/infrastructure/helpers/format-time';
import { PET_GENDERS } from '../../../../modules/pets/domain/pet-gender';

interface PetDetailsProps {
    pet: Pet;
}

const PetDetails: React.FC<PetDetailsProps> = ({ pet }) => {
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
                            <Typography>{pet.id}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Nombre:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(pet.name)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell >
                            <Typography variant="subtitle1" gutterBottom>
                                Chip:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(pet.chip)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Fecha de nacimiento:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{fDate(pet.birthDate)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Sexo:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{PET_GENDERS[pet.gender]}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Tipo
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{pet.type}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Raza:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{pet.race}</Typography>
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

export default PetDetails;
