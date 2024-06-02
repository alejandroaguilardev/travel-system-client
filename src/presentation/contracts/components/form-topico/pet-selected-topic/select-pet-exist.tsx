import { Box, Button, Dialog, DialogContent, Typography } from '@mui/material';
import { SearchPet } from '../../../../pets/components/search/search-pet';
import { Pet } from '../../../../../modules/pets/domain/pet';
import { PetDialogForm } from '../../../../pets/components/search/pet-dialog';
import { PetDialogProvider } from '../../../../pets/components/search/pet-dialog-context';
import { ClientDialogProvider } from '../../../../client/components/search-client/client-dialog-context';
import { useBoolean } from '../../../../../hooks/use-boolean';
import { useSelectedValue } from '../../../../../hooks/use-selected-value';

type Props = {
    clientId: string;
    handleSelected: (value: Pet | null) => void;
}

export const SelectPetExist = ({ clientId, handleSelected }: Props) => {
    const { value, onTrue, onFalse } = useBoolean();
    const { selected, handleSelected: handleSelectedPet } = useSelectedValue<Pet | null>();

    return (
        <>
            <Button variant="outlined" type="button" onClick={onTrue} fullWidth sx={{ mb: 2 }}>
                Seleccionar una mascota previa del cliente
            </Button>

            <Dialog open={value} onClose={onFalse} maxWidth="md" fullWidth>
                <DialogContent>
                    <PetDialogProvider>
                        <ClientDialogProvider>
                            <Box p={4} minHeight={200}>
                                <Typography variant='h6' mb={2}>Buscar y seleccionar una mascota relacionada con el cliente</Typography>
                                <SearchPet
                                    adopterId={clientId}
                                    pet={selected}
                                    handlePet={handleSelectedPet}
                                    index={0}
                                />

                                <Button variant="contained" type="button" fullWidth sx={{ my: 2 }}
                                    onClick={() => {
                                        handleSelected(selected);
                                        onFalse();
                                    }}>
                                    Confirmar selección
                                </Button>
                            </Box>
                            <PetDialogForm />
                        </ClientDialogProvider>
                    </PetDialogProvider>
                </DialogContent>
            </Dialog >
        </>
    )
}
