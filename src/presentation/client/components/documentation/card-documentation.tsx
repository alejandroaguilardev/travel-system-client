import { Card, Stack, Avatar, Divider, Typography, ListItemText, Box, Alert, Button } from '@mui/material';
import Label from '../../../../components/label/label';
import { statusColor } from '../../../contracts/components/table/status-color';
import { Documentation } from '../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import IconWrapper from '../../../../components/icon-wrapper/icon-wrapper';
import { useBoolean } from '../../../../hooks/use-boolean';
import { DialogContract } from '../dialog/dialog-contract';
import { DocumentationForm } from './form/documentation-form';

type Props = {
    documentation: Documentation;
    contractId: string;
};

export default function CardDocumentation({ documentation, contractId }: Props) {
    const dialog = useBoolean();

    return (
        <>
            <Card onClick={dialog.onTrue}>
                <Stack sx={{ p: 3, pb: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                            variant="rounded"
                            src="/assets/documents.png"
                            alt="Documentación"
                            sx={{ width: 48, height: 48, mb: 2 }}
                        />
                        <Stack>
                            <ListItemText
                                sx={{ mb: 1 }}
                                primary="Requisitos de Documentación" primaryTypographyProps={{
                                    typography: 'subtitle1',
                                }}
                                secondary="Asegúrese de tener todos los documentos necesarios."
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
                        <Label color={statusColor(documentation.status)} width="100%" >
                            {CONTRACT_STATUS.find(_ => _.value === documentation.status)?.label}
                        </Label>
                    </Stack>

                    <ListItemText
                        sx={{ my: 1, }}
                        secondary={documentation.status === "completed"
                            ? "TODOS LOS DOCUMENTOS RECIBIDOS. LISTOS PARA EL SIGUIENTE PASO. ¡GRACIAS!."
                            : "FALTAN DOCUMENTOS NECESARIOS. POR FAVOR, PROPORCIONE LA INFORMACIÓN."}
                        secondaryTypographyProps={{
                            component: 'span',
                            typography: 'caption',
                            color: 'text.disabled',
                        }}
                    />
                    <Box display="flex" justifyContent="center" my={2}>
                        {
                            documentation.status === "completed" ?
                                <Alert variant='outlined' >REQUISITOS COMPLETADOS</Alert>
                                :
                                <Button variant='outlined' color="error" fullWidth >Consultar Requisitos</Button>
                        }
                    </Box>
                </Stack>


            </Card>
            {
                dialog.value &&
                <DialogContract
                    title='Requisitos de la documentación'
                    open={dialog.value}
                    onClose={dialog.onFalse}
                >
                    <DocumentationForm
                        onCancel={dialog.onFalse}
                        contractId={contractId}
                        documentation={documentation}
                    />

                </DialogContract>
            }
        </>
    );
}
