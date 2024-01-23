import { Divider, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { OrderValue } from '../../../../../modules/shared/domain/criteria/sorting';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import { User } from '../../../../../modules/users/domain/user';
import { AutocompleteServer } from '../../../../../components/autocomplete/selector/autocomplete-server';
import { RHFTextField, RHFSwitch, ErrorMessage } from '../../../../../components/hook-form';
import { useContractFormGeneral } from './use-contract-form-general';
import { TRAVEL_TYPES } from '../../../../../modules/contracts/domain/travel/contract-travel';
import { CAGES_CHOSEN } from '../../../../../modules/contracts/domain/cage/cage-chosen';

export const ContractFormGeneral = () => {
    const { client, cage, travel, startDate, handleClient, handleCageChosen } = useContractFormGeneral();

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
                    getOptionLabel={(option: User) => `${capitalize(option.name)} ${capitalize(option.secondLastName)} ${capitalize(option.lastName)} ${capitalize(option.secondLastName)}`}
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

                    <RHFSwitch
                        name='documentation.vaccinationCertificate.hasServiceIncluded'
                        label="Certificado de vacuna"
                    />
                    <RHFSwitch
                        name='documentation.healthCertificate.hasServiceIncluded'
                        label="Certificado de salud"
                    />
                    <RHFSwitch
                        name='documentation.chipCertificate.hasServiceIncluded'
                        label="Certificado de chip"
                    />
                    <RHFSwitch
                        name='documentation.senasaDocuments.hasServiceIncluded'
                        label="Documentos de SENASA"
                    />
                    <RHFSwitch
                        name='documentation.rabiesSeroLogicalTest.hasServiceIncluded'
                        label="Test serológico de rabia"
                    />
                    <RHFSwitch
                        name='documentation.importLicense.hasServiceIncluded'
                        label="Permiso de importación"
                    />
                    <RHFSwitch
                        name='documentation.emotionalSupportCertificate.hasServiceIncluded'
                        label="Certificado de soporte emocional"
                    />
                </Stack>
                <Divider />
                <Stack spacing={1} marginBottom={1}>
                    <Typography>VENTA DE JAULA:</Typography>
                    <RHFSwitch
                        name='cage.hasServiceIncluded'
                        label="Incluye Jaula Pet travel"
                    />
                    {cage &&
                        <TextField
                            select
                            label="Selecciona tu jaula"
                            onChange={(e) => handleCageChosen(e.target.value)}
                        >
                            {CAGES_CHOSEN.map((option) => (
                                <MenuItem key={option.model} value={JSON.stringify(option)}>
                                    {option.model}  {option.dimensions} {`(${capitalize(option.type)})`}
                                </MenuItem>
                            ))}
                        </TextField>
                    }
                </Stack >
                <Divider />

                <Stack spacing={1} marginBottom={1}>
                    <Typography>SERVICIO DE VIAJE O ACOMPAÑADO DE UNA PERSONA O DE UN VIAJE POR CARGO :</Typography>

                    <RHFSwitch
                        name='travel.hasServiceIncluded'
                        label="Incluye el servicio"
                    />
                    {travel &&
                        <RHFTextField
                            name='travel.typeTraveling'
                            select
                            label="Selecciona tipo de viaje"
                        >
                            {TRAVEL_TYPES.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </RHFTextField>
                    }
                </Stack>
                <Divider />
            </Stack >
        </Stack >
    )
}
