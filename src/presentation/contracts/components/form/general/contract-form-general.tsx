import { Divider, Stack, Typography } from '@mui/material';
import { OrderValue } from '../../../../../modules/shared/domain/criteria/sorting';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import { User } from '../../../../../modules/users/domain/user';
import { AutocompleteServer } from '../../../../../components/autocomplete/selector/autocomplete-server';
import { RHFTextField, RHFSwitch, ErrorMessage } from '../../../../../components/hook-form';
import { useContractFormGeneral } from './use-contract-form-general';
import { ContractFormCage } from '../cage/contract-form-cage';
import { CertificateSwitch } from './certificate-switch';
import { CageSelected } from '../../../../client/components/cage/form/cage-selected';


export const ContractFormGeneral = () => {
    const { client, startDate, travel, cage, handleClient } = useContractFormGeneral();

    return (
        <Stack spacing={1} marginBottom={2}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1}>
                <RHFTextField
                    name='number'
                    fullWidth
                    label="Número de contrato (*)"
                    variant="outlined"
                    inputAdornment
                    placeholder='C21002'
                />
                <RHFTextField
                    name='startDate'
                    type='date'
                    value={startDate}
                    fullWidth
                    label="Fecha de contrato (*)"
                    variant="outlined"
                    inputAdornment
                />
                <ErrorMessage name="startDate" />
            </Stack>
            <Stack spacing={1} marginBottom={1}>
                <AutocompleteServer<User>
                    collection='users'
                    sorting={[{ orderBy: "name", orderType: OrderValue.ASC }]}
                    globalFilterProperties={[{ field: "name", value: "string" }, { field: "lastName", value: "string" }]}
                    defaultValue={client}
                    callback={(value) => handleClient(value as User | null)}
                    getOptionLabel={(option: User) => `${capitalize(option?.profile?.name)} ${capitalize(option?.profile?.secondLastName)} ${capitalize(option?.profile?.lastName)} ${capitalize(option?.profile?.secondLastName)}`}
                    textField={{
                        label: "Seleccionar cliente(*)",
                        placeholder: "Buscar cliente..."

                    }}
                />
                <ErrorMessage name="client" />
            </Stack>
            <Divider />
            <Stack spacing={1} marginBottom={1}>
                <Typography>DOCUMENTACIÓN PARA EL VIAJE:</Typography>

                <Stack direction={{ xs: "column", md: "row" }} flexWrap="wrap" spacing={1} marginBottom={1}>

                    <CertificateSwitch
                        label='Certificado de vacuna'
                        name="documentation.vaccinationCertificate"
                    />

                    <CertificateSwitch
                        label='Certificado de salud'
                        name="documentation.healthCertificate"
                    />

                    <CertificateSwitch
                        label='Certificado de chip'
                        name="documentation.chipCertificate"
                    />

                    <CertificateSwitch
                        label='Documentos de SENASA'
                        name="documentation.senasaDocuments"
                    />

                    <CertificateSwitch
                        label='Test serológico de rabia'
                        name="documentation.rabiesSeroLogicalTest"
                    />

                    <CertificateSwitch
                        label='Permiso de importación'
                        name="documentation.importLicense"
                    />

                    <CertificateSwitch
                        label='Certificado de soporte emocional'
                        name="documentation.emotionalSupportCertificate"
                    />

                </Stack>
                <Divider />
                <Typography>VENTA DE JAULA:</Typography>
                <RHFSwitch
                    name='cage.hasServiceIncluded'
                    label="Incluye Jaula Pet travel"
                />
                {cage &&
                    <>
                        <ContractFormCage />
                        <CageSelected readonly keyField='cage.chosen' />
                    </>
                }
                <Divider />

                <Stack spacing={1} marginBottom={1}>
                    <Typography>SERVICIO DE VIAJE  UNA MASCOTA:</Typography>
                    <RHFSwitch
                        name='travel.hasServiceIncluded'
                        label="Incluye el servicio de viaje de una mascota por cargo"
                    />
                    {!travel &&
                        <RHFSwitch
                            name='travel.hasServiceAccompanied'
                            label="Servicio de acompañamiento al aeropuerto"
                        />
                    }
                </Stack>
                <Divider />
            </Stack >
        </Stack >
    )
}
