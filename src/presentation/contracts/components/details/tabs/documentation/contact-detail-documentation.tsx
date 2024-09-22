import React from 'react';
import {
    Typography,
    Divider,
    Card,
    CardContent,
    Stack,
} from '@mui/material';
import { useDetailInfoContext } from '../../../../context/contract-detail-context';
import ContractDetailCardDocumentation from './contract-detail-card-documentation';
import Label from '../../../../../../components/label';
import { statusColor } from '../../../table/status-color';
import { CertificateDownload, PdfDownload } from '../../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { useDownloadCertificate } from '../../../../hooks/use-download-certificate';
import { LoadingButton } from '@mui/lab';
import { useDownloadPdf } from '../../../../hooks/use-download-pdf';
import { useSenasaExcelDownload } from '../../../form-documentation/senasa/use-senasa-excel-download';
import { CONTRACT_STATUS } from '../../../../../../modules/contracts/domain/contract-status';

export const ContractDetailDocumentation: React.FC = () => {
    const { contract } = useDetailInfoContext();
    const { downloadCertificate, isLoading } = useDownloadCertificate();
    const { downloadPdf, isLoading: isLoadingPdf } = useDownloadPdf();
    const { downloadSenasa, isLoading: isLoadingSenasa } = useSenasaExcelDownload();

    return (
        <>
            {contract.details.map((detail, index) => (
                <Card sx={{ my: 3, boxShadow: 3, borderRadius: 2 }} key={`${detail.id}`}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom color="chocolate">
                            {detail.pet?.name
                                ? `${detail.pet.name} (Microchip: ${detail.pet.chip || "No disponible"})`
                                : `Mascota número ${index + 1}: (Pendiente de admisión)`}
                        </Typography>

                        <Label
                            color={statusColor(detail?.documentation?.status)}
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                p: 2,
                                mb: 1,
                                fontSize: '0.875rem',
                                width: "100%"
                            }}
                        >
                            CONDICIÓN DEL DOCUMENTACIÓN {CONTRACT_STATUS.find(_ => _.value === detail.documentation?.status)?.label}
                        </Label>

                        <Label
                            color={statusColor(detail?.documentation?.clientStatus)}
                            sx={{
                                fontWeight: 'bold',
                                textTransform: 'capitalize',
                                p: 2,
                                mb: 1,
                                fontSize: '0.875rem',
                                width: "100%"
                            }}
                        >
                            NIVEL DE PROGRESO DEL CLIENTE {CONTRACT_STATUS.find(_ => _.value === detail.documentation?.clientStatus)?.label}
                        </Label>
                        <Divider sx={{ my: 2 }} />
                        <Stack direction="row" spacing={2} width="100%">
                            <ContractDetailCardDocumentation label="Certificado de chip" doc={detail.documentation.chipCertificate}  >
                                <LoadingButton
                                    onClick={() => downloadCertificate(contract.id, detail.id, CertificateDownload.MICROCHIP)}
                                    disabled={detail?.documentation?.chipCertificate?.resultDate ? false : true}
                                    variant='outlined'
                                    fullWidth
                                    loading={isLoading}
                                    sx={{ mb: 1 }}
                                >
                                    {detail?.documentation?.chipCertificate?.resultDate ? "Descargar datos del certificado en excel" : " Aún no se ha generado el certificado"}
                                </LoadingButton>
                            </ContractDetailCardDocumentation>

                            <ContractDetailCardDocumentation label="Certificado de vacunación" doc={detail.documentation.vaccinationCertificate} >
                                <LoadingButton
                                    onClick={() => downloadCertificate(contract.id, detail.id, CertificateDownload.VACCINATION)}
                                    disabled={detail?.documentation?.chipCertificate?.resultDate ? false : true}
                                    variant='outlined'
                                    fullWidth
                                    loading={isLoading}
                                    sx={{ mb: 1 }}
                                >
                                    {detail?.documentation?.vaccinationCertificate?.resultDate ? "Descargar datos del certificado en excel" : " Aún no se ha generado el certificado"}
                                </LoadingButton>
                                <LoadingButton
                                    onClick={() => downloadPdf(contract.id, detail.id, PdfDownload.CDCR)}
                                    disabled={isLoadingPdf}
                                    loading={isLoadingPdf}
                                    variant='outlined'
                                    fullWidth
                                    sx={{ mb: 1 }}
                                >  Descargar  CDC USA
                                </LoadingButton>
                            </ContractDetailCardDocumentation>
                        </Stack>

                        <Divider sx={{ my: 3 }} />

                        <Stack direction="row" spacing={2} width="100%">
                            <ContractDetailCardDocumentation label="Resultado del test serológico de rabia" doc={detail.documentation.rabiesSeroLogicalTest} >
                                <LoadingButton
                                    onClick={() => downloadPdf(contract.id, detail.id, PdfDownload.RABIES_SEROLOGY)}
                                    disabled={isLoadingPdf}
                                    loading={isLoadingPdf}
                                    variant='outlined'
                                    fullWidth
                                    sx={{ mb: 1 }}
                                >  Descargar formato
                                </LoadingButton>
                            </ContractDetailCardDocumentation>

                            <ContractDetailCardDocumentation label="Certificado de salud veterinaria" doc={detail.documentation.healthCertificate} >
                                <LoadingButton
                                    onClick={() => downloadCertificate(contract.id, detail.id, CertificateDownload.HEALTH)}
                                    disabled={detail?.documentation?.healthCertificate?.resultDate ? false : true}
                                    variant='outlined'
                                    fullWidth
                                    loading={isLoading}
                                    sx={{ mb: 1 }}
                                >
                                    {detail?.documentation?.vaccinationCertificate?.resultDate ? "Descargar datos del certificado en excel" : " Aún no se ha generado el certificado"}
                                </LoadingButton>
                            </ContractDetailCardDocumentation>
                        </Stack>
                        <Divider sx={{ my: 3 }} />

                        <Stack direction="row" spacing={2} width="100%">
                            <ContractDetailCardDocumentation label="Permiso de importación" doc={detail.documentation.importLicense} />
                            <ContractDetailCardDocumentation label="Documentación oficial de SENASA" doc={detail.documentation.senasaDocuments} >
                                <LoadingButton
                                    onClick={() => downloadSenasa(contract.id, detail.id)}
                                    disabled={isLoadingSenasa}
                                    loading={isLoadingSenasa}
                                    variant='outlined'
                                    fullWidth
                                    sx={{ mb: 1 }}
                                >  Descargar Excel Solicitud Senasa
                                </LoadingButton>
                            </ContractDetailCardDocumentation>
                        </Stack>
                        <Divider sx={{ my: 3 }} />
                        <Stack direction="row" spacing={2} width="100%">
                            <ContractDetailCardDocumentation label="Certificado de soporte emocional" doc={detail.documentation.emotionalSupportCertificate} />
                        </Stack>
                    </CardContent >
                    <Divider sx={{ my: 2 }} />
                </Card >
            ))}
        </>
    );
};
