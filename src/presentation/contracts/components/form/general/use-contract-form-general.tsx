import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { User } from '../../../../../modules/users/domain/user';
import { userService } from '../../../../../modules/users/infrastructure/user.service';
import { fDate } from '../../../../../modules/shared/infrastructure/helpers/format-time';

export const useContractFormGeneral = () => {
    const { setValue, getValues, watch } = useFormContext();
    const [client, setClient] = useState<User | null>(null);
    const clientDefault: string = getValues("client");

    const travel = watch("travel.hasServiceIncluded");
    const typeTraveling = watch("travel.typeTraveling");
    const startDate = fDate(watch("startDate"), 'yyyy-MM-dd');
    const cage = watch("cage.hasServiceIncluded");

    useEffect(() => {
        if (clientDefault) {
            userService.searchById<User>(clientDefault)
                .then(response => setClient(response))
                .catch(() => setClient(null));
        }
    }, [clientDefault])

    useEffect(() => {
        if (travel && typeTraveling === "none") {
            setValue("travel.typeTraveling", "accompanied")
        }
        if (!travel) {
            setValue("travel.typeTraveling", "none")
        }
    }, [travel, typeTraveling])

    const handleClient = (value: User | null) => {
        setClient(value as User | null);
        setValue("client", value?.id ?? "")
    }


    return {
        client,
        cage,
        travel,
        typeTraveling,
        startDate,
        handleClient,
    }
}
