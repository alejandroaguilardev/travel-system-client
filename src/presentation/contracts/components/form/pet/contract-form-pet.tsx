import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import IconWrapper from '../../../../../components/icon-wrapper/icon-wrapper';
import Iconify from '../../../../../components/iconify';
import { SearchPet } from '../../../../pets/components/search/search-pet';
import { ContractFormPetDetail } from './detail/contract-form-pet-detail';
import { useContractFormPet } from './use-contract-form-pet';

export const ContractFormPet = () => {
    const { selectedPet, clientId, details, addPet, removePet, handleNewPet } = useContractFormPet();

    return (
        <Stack spacing={1} marginBottom={2} marginTop={2}>

            {details?.length > 0
                ? details.map((detail, index) => (
                    <Accordion key={detail.id} defaultExpanded>
                        <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                            <Typography variant="subtitle1">
                                <IconButton color='error' sx={{ mr: 1 }} onClick={() => removePet(detail)}>
                                    <IconWrapper icon="removeFilled" width={25} />
                                </IconButton>
                                {
                                    detail?.pet?.name ?
                                        <>
                                            {capitalize(detail?.pet?.name)}  ({capitalize(detail?.pet?.type)})
                                        </>
                                        :
                                        <>Mascota N° {index + 1}</>
                                }
                            </Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails>
                            <Box mb={2}>
                                <SearchPet
                                    adopterId={clientId}
                                    pet={selectedPet}
                                    handlePet={(pet) => handleNewPet(index, pet)}
                                    index={index}
                                />
                            </Box>

                            <ContractFormPetDetail field={`details[${index}].`} />
                        </AccordionDetails>
                    </Accordion>
                ))
                : <Alert severity='error' variant='filled' sx={{ my: 5 }}>No hay mascotas seleccionadas en este momento, debes indicar al menos una.</Alert>
            }

            <Button
                fullWidth
                variant='outlined'
                size="large"
                sx={{
                    my: 2
                }}
                onClick={() => addPet()} startIcon={<IconWrapper icon="add" />}
            >
                Agregar más mascotas al contrato
            </Button>
        </Stack>
    )
}
