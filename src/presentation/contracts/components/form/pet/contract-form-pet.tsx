import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Divider, Stack, Typography } from '@mui/material';
import { capitalize } from '../../../../../modules/shared/domain/helpers/capitalize';
import IconWrapper from '../../../../../components/icon-wrapper/icon-wrapper';
import Iconify from '../../../../../components/iconify';
import { ContractFormPetDetail } from './detail/contract-form-pet-detail';
import { useContractFormPet } from './use-contract-form-pet';

export const ContractFormPet = () => {
    const { details, addPet, removePet } = useContractFormPet();

    return (
        <Stack spacing={1} marginBottom={2} marginTop={2}>
            {details?.length > 0
                ? details.map((detail, index) => (
                    <Accordion key={detail.id} defaultExpanded>
                        <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />} >
                            <Typography variant="subtitle1">
                                <Button
                                    variant="contained"
                                    color='error' sx={{ mr: 1 }}
                                    size='small'
                                    onClick={() => removePet(detail)}
                                >
                                    Eliminar
                                </Button>
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
