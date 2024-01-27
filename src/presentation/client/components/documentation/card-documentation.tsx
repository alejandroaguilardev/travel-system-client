import { Card, Stack, Avatar, Divider, Typography, ListItemText } from '@mui/material';
import Label from '../../../../components/label/label';
import { statusColor } from '../../../contracts/components/table/status-color';
import { DocumentationDefinition } from '../../../../modules/contracts/domain/interfaces/documentation';
import { CONTRACT_STATUS } from '../../../../modules/contracts/domain/contract-status';
import IconWrapper from '../../../../components/icon-wrapper/icon-wrapper';
import { useBoolean } from '../../../../hooks/use-boolean';
import { DialogContract } from '../dialog/dialog-contract';
import { DocumentationForm } from './form/documentation-form';

type Props = {
    documentation: DocumentationDefinition;
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
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                {[
                    {
                        label: <Label color={documentation.vaccinationCertificate.isApplied ? "success" : "error"} width="100%">
                            Certificado de vacuna
                        </Label>,
                        icon: <IconWrapper width={16} icon="vaccination" sx={{ flexShrink: 0 }} />,
                    },
                    {
                        label: <Label color={documentation.healthCertificate.isApplied ? "success" : "error"} sx={{ width: "100%" }}>
                            Certificado de salud
                        </Label>,
                        icon: <IconWrapper width={16} icon="health" sx={{ flexShrink: 0 }} />,
                    },
                    {
                        label: <Label color={documentation.chipCertificate.isApplied ? "success" : "error"} width="100%">
                            Certificado de chip
                        </Label>,
                        icon: <IconWrapper width={16} icon="chip" sx={{ flexShrink: 0 }} />,
                    },
                    {
                        label: <Label color={documentation.senasaDocuments.isApplied ? "success" : "error"} width="100%">
                            Documentos de SENASA
                        </Label>,
                        icon: <IconWrapper width={16} icon="docs" sx={{ flexShrink: 0 }} />,
                    },
                    {
                        label: <Label color={documentation.rabiesSeroLogicalTest.isApplied ? "success" : "error"} width="100%">
                            Test serológico de rabia
                        </Label>,
                        icon: <IconWrapper width={16} icon="testCase" sx={{ flexShrink: 0 }} />,
                    },
                    {
                        label: <Label color={documentation.importLicense.isApplied ? "success" : "error"} width="100%">
                            Permiso de importación
                        </Label>,
                        icon: <IconWrapper width={16} icon="homeImport" sx={{ flexShrink: 0 }} />,
                    },
                    {
                        label: <Label color={documentation.emotionalSupportCertificate.isApplied ? "success" : "error"} width="100%">
                            Certificado de soporte emocional
                        </Label>,
                        icon: <IconWrapper width={16} icon="emotional" sx={{ flexShrink: 0 }} />,
                    },
                ].map((item, index) => (
                    <Stack
                        mb={1}
                        px={4}
                        key={index}
                        spacing={0.5}
                        flexShrink={0}
                        direction="row"
                        alignItems="center"
                        sx={{ color: 'text.disabled', minWidth: 0 }}
                    >
                        {item.icon}
                        <Typography variant="caption" noWrap width="100%">
                            {item.label}
                        </Typography>
                    </Stack>
                ))}
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
