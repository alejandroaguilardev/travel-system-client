import { ConditionUserProvider } from '../../../users/contexts/condition-user-context';
import { UserForm } from '../../../users/components/form/user-form';
import { Dialog, DialogContent } from '@mui/material';
import { NewUser } from '../../../../modules/users/domain/user';
import { useClientDialogContext } from './client-dialog-context';

export const ClientDialogForm = () => {
    const { value, onFalse, handleClient } = useClientDialogContext();

    return (
        <Dialog open={value} onClose={onFalse} fullWidth maxWidth="xl">
            <DialogContent sx={{ py: 4 }}>
                <ConditionUserProvider isUser={false}>
                    <UserForm callback={(newUser?: NewUser) => {
                        handleClient(newUser ?? null);
                        onFalse();
                    }}
                        notReload
                    />
                </ConditionUserProvider>
            </DialogContent>
        </Dialog>
    )
}
