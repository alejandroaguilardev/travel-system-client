import React from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableRow, Divider, useTheme, Box } from '@mui/material';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { Folder } from '../../../../modules/folders/domain/folder';
import { PaperCustom } from '../../../../components/paper/paper-custom';
import { capitalize } from '../../../../modules/shared/domain/helpers';

interface FolderDetailsProps {
    folder: Folder;
}

const FolderDetails: React.FC<FolderDetailsProps> = ({ folder }) => {
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
                            <Typography>{folder.id}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell>
                            <Typography variant="subtitle1" gutterBottom>
                                Folder:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{capitalize(folder.name)}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow hover component="th" scope="row">
                        <TableCell >
                            <Typography variant="subtitle1" gutterBottom>
                                Sobres:
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{folder.quantity}</Typography>
                        </TableCell>
                    </TableRow>                </TableBody>
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

export default FolderDetails;
