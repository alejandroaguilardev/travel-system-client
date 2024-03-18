import { Divider, Stack, Typography } from '@mui/material';
import { RHFSwitch } from '../../../../../../components/hook-form';
import { AutocompleteSelectorClient } from '../../../../../../components/autocomplete/client/autocomplete-selector-client';
import { countries } from '../../../../../../modules/shared/domain/helpers/countries';
import { ContractFormCage } from '../../cage/contract-form-cage';
import { CertificateSwitch } from './certificate-switch';
import { CageSelected } from '../../../../../client/components/cage/form/cage-selected';
import { useContractFormPetDetail } from './use-contract-form-pet-detail';

type Props = {
    field: string;
}

export const ContractFormPetDetail = ({ field }: Props) => {
    const { travel, cage, country, handleCountry } = useContractFormPetDetail({ field });

    return (
        <Stack spacing={1} marginBottom={2}>
            <Stack spacing={1} marginBottom={1}>
                <Typography mb={2}>SERVICIO DE VIAJE  UNA MASCOTA:</Typography>

                <AutocompleteSelectorClient
                    textField={{
                        label: "País Destino (*)"
                    }}
                    items={countries}
                    defaultValue={countries.find(_ => _.name_es === country) || null}
                    getOptionLabel={(d: any) => d.name_es}
                    callback={(value) => {
                        handleCountry(value?.name_es ?? "");
                    }}
                    propertiesFilter={["name_es"]}

                />
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
                <Divider />
            </Stack>
            <Stack spacing={1} marginBottom={1}>

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
                <Divider />
            </Stack>
            <Stack spacing={1} marginBottom={1}>

                <Typography>DOCUMENTACIÓN PARA EL VIAJE:</Typography>

                <Stack direction={{ xs: "column", md: "row" }} flexWrap="wrap" spacing={1} marginBottom={1}>
                    <CertificateSwitch
                        label='Certificado de chip'
                        name={`${field}documentation.chipCertificate`}
                    />
                    <CertificateSwitch
                        label='Certificado de vacuna'
                        name={`${field}documentation.vaccinationCertificate`}
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
                        label='Certificado de salud'
                        name={`${field}documentation.healthCertificate`}
                    />

                    <CertificateSwitch
                        label='Documentos de SENASA'
                        name={`${field}documentation.senasaDocuments`}
                    />

                    <CertificateSwitch
                        label='Certificado de soporte emocional'
                        name={`${field}documentation.emotionalSupportCertificate`}
                    />

                </Stack>
            </Stack>
        </Stack>
    )
}
