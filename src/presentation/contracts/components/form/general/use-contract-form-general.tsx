import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { NewUser, User } from '../../../../../modules/users/domain/user';
import { userService } from '../../../../../modules/users/infrastructure/user.service';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { useClientDialogContext } from '../../../../client/components/search-client/client-dialog-context';
import { useAuthContext } from '../../../../auth/hooks/use-auth-context';

export const useContractFormGeneral = () => {
    const { setValue, getValues, watch } = useFormContext();

    const [client, setClient] = useState<User | null>(null);
    const [adviser, setAdvisor] = useState<User | null>(null);

    const clientDefault: string = getValues("client");
    const adviserDefault: string = getValues("adviser");

    const startDate: Date = fDayjs(watch("startDate"));

    const { client: clientContext, handleClient: handleClientContext } = useClientDialogContext();
    const { user } = useAuthContext();

    useEffect(() => {
        if (clientDefault) {
            userService.searchById<User>(clientDefault)
                .then(response => setClient(response))
                .catch(() => setClient(null));
        }
    }, [clientDefault]);

    useEffect(() => {
        if (adviserDefault) {
            userService.searchById<User>(adviserDefault)
                .then(response => setAdvisor(response))
                .catch(() => setAdvisor(null));
        }
    }, [adviserDefault]);

    useEffect(() => {
        if (clientContext) {
            const clientSelected = { ...clientContext, roles: [] } as User;
            setClient(clientSelected)
            setValue("client", clientContext?.id ?? "");
        }

    }, [clientContext])

    useEffect(() => {
        if (user && !adviserDefault) {
            setAdvisor(user)
            setValue("adviser", user?.id ?? "");
        }

    }, [user])


    const handleClient = (value: User | null) => {
        handleClientContext(value as NewUser | null);
        setClient(value as User | null);
        setValue("client", value?.id ?? "");
    }

    const handleAdvisor = (value: User | null) => {
        setAdvisor(value as User | null);
        setValue("adviser", value?.id ?? "");
    }

    return {
        client,
        adviser,
        startDate,
        handleClient,
        handleAdvisor,
    }

}