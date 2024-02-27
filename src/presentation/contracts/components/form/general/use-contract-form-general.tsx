import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { NewUser, User } from '../../../../../modules/users/domain/user';
import { userService } from '../../../../../modules/users/infrastructure/user.service';
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { useClientDialogContext } from '../../../../client/components/search-client/client-dialog-context';

export const useContractFormGeneral = () => {
    const { setValue, getValues, watch } = useFormContext();
    const [client, setClient] = useState<User | null>(null);
    const clientDefault: string = getValues("client");

    const startDate = fDate(watch("startDate"), 'yyyy-MM-dd');
    const { client: clientContext, handleClient: handleClientContext } = useClientDialogContext();


    useEffect(() => {
        if (clientDefault) {
            userService.searchById<User>(clientDefault)
                .then(response => setClient(response))
                .catch(() => setClient(null));
        }
    }, [clientDefault])

    useEffect(() => {
        if (clientContext) {
            const clientSelected = { ...clientContext, roles: [] } as User;
            setClient(clientSelected)
            setValue("client", clientContext?.id ?? "");
        }

    }, [clientContext])


    const handleClient = (value: User | null) => {
        handleClientContext(value as NewUser | null);
        setClient(value as User | null);
        setValue("client", value?.id ?? "");
    }


    return {
        client,
        startDate,
        handleClient,
    }
}
