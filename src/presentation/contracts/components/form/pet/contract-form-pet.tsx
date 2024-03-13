import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, IconButton, Stack, Typography } from '@mui/material';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import IconWrapper from '../../../../../components/icon-wrapper/icon-wrapper';
import Iconify from '../../../../../components/iconify';
import { SearchPet } from '../../../../pets/components/search/search-pet';
import { ContractFormPetDetail } from './detail/contract-form-pet-detail';
import { useContractFormPet } from './use-contract-form-pet';
import { useFormContext } from 'react-hook-form';

export const ContractFormPet = () => {
    const { selectedPet, clientId, details, addPet, removePet, handleNewPet } = useContractFormPet();

    return (
        <Stack spacing={1} marginBottom={2} marginTop={2}>
            <SearchPet adopterId={clientId} pet={selectedPet} handlePet={handleNewPet} />
            <Button fullWidth variant='outlined' onClick={() => addPet(selectedPet)} startIcon={<IconWrapper icon="add" />}>
                Agregar más mascotas al contrato
            </Button>
            {details.length > 0
                ? details.map((detail, index) => (
                    <Accordion key={detail.id} defaultExpanded>
                        <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                            <Typography variant="subtitle1">
                                <IconButton color='error' sx={{ mr: 1 }} onClick={() => removePet(detail)}>
                                    <IconWrapper icon="removeFilled" width={25} />
                                </IconButton>

                                {capitalize(detail.pet.name)}  ({capitalize(detail.pet.type)})
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ContractFormPetDetail field={`details[${index}].`} />
                        </AccordionDetails>
                    </Accordion>
                ))
                : <Alert severity='error' variant='filled' sx={{ my: 5 }}>No hay mascotas seleccionadas en este momento, debes indicar al menos una.</Alert>
            }
        </Stack>
    )
}
