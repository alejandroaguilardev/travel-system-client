import { Dialog, DialogContent } from '@mui/material';
import { Pet } from '../../../../modules/pets/domain/pet';
import { useClientDialogContext } from '../../../client/components/search-client/client-dialog-context';
import { ConditionUserProvider } from '../../../users/contexts/condition-user-context';
import { PetForm } from '../form/pet-form';
import { usePetDialogContext } from './pet-dialog-context';


export const PetDialogForm = () => {
    const { value, onFalse, handlePet } = usePetDialogContext();
    const { client } = useClientDialogContext();

    return (
        <>
            {
                value &&
                <Dialog open={value} onClose={onFalse} fullWidth maxWidth="xl">
                    <DialogContent sx={{ py: 4 }}>
                        <ConditionUserProvider isUser={false}>
                            <PetForm
                                adopterId={client?.id}
                                callback={(pet?: Pet) => {
                                    handlePet(pet ?? null);
                                    onFalse();
                                }}
                                notReload
                                onCancel={onFalse}
                            />
                        </ConditionUserProvider>
                    </DialogContent>
                </Dialog>
            }
        </>
    )
}
