import { Box, Stack, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { NewUser, User } from "../../../../modules/users/domain/user";
import { userService } from "../../../../modules/users/infrastructure/user.service";
import { useAuthContext } from "../../../auth/hooks";
import { useClientDialogContext } from "../../../client/components/search-client/client-dialog-context";
import { SearchClient } from "../../../client/components/search-client/search-client"

export const TopicoSearchUser = () => {
    const { setValue, getValues } = useFormContext();
    const { user } = useAuthContext();
    const { client: clientContext, handleClient: handleClientContext } = useClientDialogContext();

    const [client, setClient] = useState<User | null>(null);
    const clientDefault: string = getValues("user");
    useEffect(() => {
        if (clientDefault) {
            userService.searchById<User>(clientDefault)
                .then(response => {
                    if (response?.isDoctor) {
                        setClient(response);
                    }
                })
                .then()
                .catch(() => setClient(null));
        }
    }, [clientDefault]);

    useEffect(() => {
        if (clientContext) {
            const clientSelected = { ...clientContext, roles: [] } as User;
            if (clientSelected?.isDoctor) setClient(clientSelected)

            setValue("user", clientContext?.id ?? "");
        }

    }, [clientContext])

    const handleUser = (value: User | null) => {
        handleClientContext(value as NewUser | null)
        setClient(value as User | null);
        setValue("user", value?.id ?? "");
    }

    useEffect(() => {
        if (user && !clientDefault) {
            setValue("user", user?.id ?? "");
        }
        if (user?.isDoctor) setClient(user)
    }, [user]);

    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={1} marginBottom={1} width="100%">
            <SearchClient
                filters={[
                    {
                        field: "isDoctor",
                        value: true
                    }
                ]}
                client={client}
                handleClient={handleUser}
                field='user'
                textField={{
                    label: "Veterinario que realiza el procedimiento (*)",
                    placeholder: "Buscar veterinario...",
                }}
                noOptionsText={
                    <Box width="100%" >
                        <Typography width="100%" textAlign="center" mb={1}>No hemos encontrado  el veterinario en nuestra base de datos</Typography>
                    </Box>
                }
                newPerson={false}
                labelNewPerson="Crear nuevo doctor"
            />
        </Stack>
    )
}
