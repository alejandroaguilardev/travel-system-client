import { Divider, Stack, Typography } from '@mui/material';
import { RHFSwitch } from '../../../../../../components/hook-form';
import { ContractFormCage } from '../../cage/contract-form-cage';
import { CertificateSwitch } from './certificate-switch';
import { CageSelected } from '../../../../../client/components/cage/form/cage-selected';
import { useContractFormPetDetail } from './use-contract-form-pet-detail';

type Props = {
    field: string;
}

export const ContractFormPetDetail = ({ field }: Props) => {
    const { travel, cage } = useContractFormPetDetail({ field });

    return (
        <Stack spacing={1} marginBottom={2}>
            <Stack spacing={1} marginBottom={1}>
                <Typography>DOCUMENTACIÓN PARA EL VIAJE:</Typography>

                <Stack direction={{ xs: "column", md: "row" }} flexWrap="wrap" spacing={1} marginBottom={1}>

                    <CertificateSwitch
                        label='Certificado de vacuna'
                        name={`${field}documentation.vaccinationCertificate`}
                    />

                    <CertificateSwitch
                        label='Certificado de salud'
                        name={`${field}documentation.healthCertificate`}
                    />

                    <CertificateSwitch
                        label='Certificado de chip'
                        name={`${field}documentation.chipCertificate`}
                    />

                    <CertificateSwitch
                        label='Documentos de SENASA'
                        name={`${field}documentation.senasaDocuments`}
                    />

                    <CertificateSwitch
                        label='Test serológico de rabia'
                        name={`${field}documentation.rabiesSeroLogicalTest`}
                    />

                    <CertificateSwitch
                        label='Permiso de importación'
                        name={`${field}documentation.importLicense`}

                    />

                    <CertificateSwitch
                        label='Certificado de soporte emocional'
                        name={`${field}documentation.emotionalSupportCertificate`}
                    />

                </Stack>
                <Divider />
                <Typography>VENTA DE JAULA:</Typography>
                <RHFSwitch
                    name={`${field}cage.hasServiceIncluded`}
                    label="Incluye Jaula Pet travel"
                />
                {cage &&
                    <>
                        <Typography fontWeight="bold">Selección de Jaula</Typography>
                        <ContractFormCage keyValue={`${field}cage.chosen`} />
                        <CageSelected readonly keyField={`${field}cage.chosen`} />
                    </>
                }
                {!cage &&
                    <>
                        <Typography fontWeight="bold">Recomendación de Jaula</Typography>
                        <ContractFormCage keyValue={`${field}cage.recommendation`} />
                        <CageSelected readonly keyField={`${field}cage.recommendation`} />
                    </>
                }
                <Divider />

                <Stack spacing={1} marginBottom={1}>
                    <Typography>SERVICIO DE VIAJE  UNA MASCOTA:</Typography>
                    <RHFSwitch
                        name={`${field}travel.hasServiceIncluded`}
                        label="Incluye el servicio de viaje de una mascota por cargo"
                    />
                    {!travel &&
                        <RHFSwitch
                            name={`${field}travel.hasServiceAccompanied`}
                            label="Servicio de acompañamiento al aeropuerto"
                        />
                    }
                </Stack>
                <Divider />
            </Stack >

        </Stack>
    )
}
