import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ReturnType, useBoolean } from '../../../../hooks/use-boolean';
import { NewUser } from '../../../../modules/users/domain/user';
import { userService } from '../../../../modules/users/infrastructure/user.service';

type ClientDialogContextTypes = ReturnType & {
    client: NewUser | null;
    handleClient: (updatedClient: NewUser | null) => void;
}

type Props = {
    children: ReactNode;
    value?: boolean;
    clientId?: string;

}

const ClientDialogContext = createContext<ClientDialogContextTypes>({} as ClientDialogContextTypes);

export const ClientDialogProvider = ({ children, clientId, value = false }: Props) => {
    const boolean = useBoolean(value);
    const [client, setClient] = useState<NewUser | null>(null);

    const handleClient = (updatedClient: NewUser | null) => {
        setClient(updatedClient)
    }

    const memo = useMemo(() => ({ ...boolean, client, handleClient }), [client, handleClient, boolean])

    useEffect(() => {
        if (clientId) {
            userService.searchById<NewUser>(clientId)
                .then((response) => setClient(response))
                .catch(() => setClient(null))
        }
    }, [clientId])

    return (
        <ClientDialogContext.Provider value={memo}>
            {children}
        </ClientDialogContext.Provider>
    )
}

export const useClientDialogContext = () => {
    const context = useContext(ClientDialogContext);
    if (context.onTrue === undefined) throw new Error("No esta declarado el ClientDialogContext");

    return context
}