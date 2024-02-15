import React from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableRow, Divider, useTheme, Box } from '@mui/material';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { Cage } from '../../../../modules/cages/domain/cage';
import { PaperCustom } from '../../../../components/paper/paper-custom';
import { capitalize } from '../../../../modules/shared/domain/helpers';

interface CageDetailsProps {
    cage: Cage;
}

const CageDetails: React.FC<CageDetailsProps> = ({ cage }) => {
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
                            <Typography>{cage.id}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Tipo:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(cage.typeCage)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell >
                            <Typography variant="subtitle1" gutterBottom>
                                Modelo:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(cage.modelCage)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Dimensiones:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{cage.dimensionsCage || "--"}</Typography>
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

export default CageDetails;
