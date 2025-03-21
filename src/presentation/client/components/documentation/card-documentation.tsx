import { Card, Stack, Avatar, ListItemText, Box, Alert, Button } from '@mui/material';
import Label from '../../../../components/label/label';
import { statusColor } from '../../../contracts/components/table/status-color';
import { Documentation } from '../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import { useBoolean } from '../../../../hooks/use-boolean';
import { DialogContract } from '../dialog/dialog-contract';
import { DocumentationForm } from './form/documentation-form';
import { useContractStore } from '../../../../state/contract/contract-store';

type Props = {
    documentation: Documentation;
    contractId: string;
    detailId: string;
    finish: boolean;
};

const labelStatus = (documentation: Documentation): string => {

    if (documentation.status === "pending") return "EN PROCESO";
    if (documentation.clientStatus !== "completed") return "FALTAN DOCUMENTOS";
    return CONTRACT_STATUS.find(_ => _.value === documentation.clientStatus)?.label ?? "PENDIENTE";
}

export default function CardDocumentation({ documentation, finish, contractId, detailId }: Props) {
    const dialog = useBoolean();
    const { onSelected, onSelectedDetail } = useContractStore();



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
                                primary="Confirma la documentación de tu mascota" primaryTypographyProps={{
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
                        <Label color={statusColor(documentation.clientStatus)} width="100%" >
                            {labelStatus(documentation)}
                        </Label>
                    </Stack>

                    <ListItemText
                        sx={{ my: 1, }}
                        secondary={documentation.clientStatus === "completed"
                            ? "TODOS LOS DOCUMENTOS FINALIZADOS. LISTOS PARA EL SIGUIENTE PASO. ¡GRACIAS!."
                            : "FALTAN DOCUMENTOS NECESARIOS. POR FAVOR, PROPORCIONE LA INFORMACIÓN."}
                        secondaryTypographyProps={{
                            component: 'span',
                            typography: 'caption',
                            color: 'text.disabled',
                        }}
                    />
                    <Box display="flex" justifyContent="center" my={2}>
                        {
                            documentation.clientStatus === "completed" ?
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
                    title='Confirma la documentación de tu mascota'
                    open={dialog.value}
                    onClose={dialog.onFalse}
                >
                    <DocumentationForm
                        onCancel={dialog.onFalse}
                        contractId={contractId}
                        documentation={documentation}
                        detailId={detailId}
                        noShowButton={finish}
                        callback={(response) => {
                            onSelected(response?.contract ?? null);
                            onSelectedDetail(response?.contractDetail ?? null);
                            dialog.onFalse();
                        }}
                    />

                </DialogContract>
            }
        </>
    );
}
