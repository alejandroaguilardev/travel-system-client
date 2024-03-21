import { useFormContext } from 'react-hook-form';
import { Alert, Box, Stack, Typography } from '@mui/material';
import { SearchPet } from '../../../../presentation/pets/components/search/search-pet';
import { useContractFormPet } from '../form/pet/use-contract-form-pet';
import { ContractPetObjectSchema } from './assign-pet-form';

export const AssignPetFormGeneral = () => {
    const { selectedPet, clientId, details, handleNewPet } = useContractFormPet();
    const { formState } = useFormContext<ContractPetObjectSchema>();

    return (
        <>
            <Stack spacing={1} marginBottom={2} marginTop={2}>
                {details?.length > 0
                    ? details.map((detail, index) => (
                        <Box key={detail.id} mb={1}>
                            <Typography fontWeight="bold">
                                Mascota N° {index + 1}:
                            </Typography>
                            <SearchPet
                                adopterId={clientId}
                                pet={selectedPet}
                                handlePet={(pet) => handleNewPet(index, pet)}
                                index={index}
                            />
                            {
                                formState.errors?.details?.[index] && (
                                    <Alert severity='error' >
                                        Debe seleccionar una mascota
                                    </Alert>
                                )
                            }
                        </Box>
                    ))
                    : <Alert severity='error' variant='filled' sx={{ my: 5 }}>No hay mascotas seleccionadas en este momento, debes indicar al menos una.</Alert>
                }
            </Stack >
        </>
    )
}
