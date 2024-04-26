import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { StepType } from '../../../../../components/stepper/types';
import { useMessage } from '../../../../../hooks/use-message';
import { AccompaniedFormGeneral } from './accompanied-form-general';
import { ChargeFormGeneral } from './charge-form-general';
import { DestinationFormGeneral } from './destination-form';
import IconWrapper from '../../../../../components/icon-wrapper/icon-wrapper';
import { TravelAccompaniedSchema } from '../accompanied-validation';
import { Box } from '@mui/material';
import { User } from '../../../../../modules/users/domain/user';

type Props = {
    hasCharge: boolean;
    notButton: boolean;
    client?: User;
}

export const useAccompaniedSteps = ({ hasCharge, notButton, client }: Props) => {
    const { getValues } = useFormContext<TravelAccompaniedSchema>();
    const { showNotification } = useMessage();

    const steps: StepType[] = useMemo(() => [
        {
            value: " Salida",
            component: <AccompaniedFormGeneral notButton={notButton} client={client} />,
            icon: <IconWrapper icon="departure" width={24} />,
            handleNext: (setActiveStep) => {
                const { accompaniedPet } = getValues();
                if (!accompaniedPet.name) {
                    showNotification('Ingrese el nombre del remitente', { variant: "error" });
                    return;
                }

                if (!accompaniedPet.phone && accompaniedPet.phone.length < 3) {
                    showNotification('Ingrese el teléfono del remitente', { variant: "error" });
                    return;
                }

                if (!accompaniedPet.email) {
                    showNotification('Ingrese el correo electrónico del remitente', { variant: "error" });
                    return;
                }

                if (!accompaniedPet.document) {
                    showNotification('Ingrese el documento del remitente', { variant: "error" });
                    return;
                }

                if (!accompaniedPet.documentNumber) {
                    showNotification('Ingrese el número de documento del remitente', { variant: "error" });
                    return;
                }

                if (!accompaniedPet.department) {
                    showNotification('Indique el departamento del remitente', { variant: "error" });
                    return;
                }
                if (!accompaniedPet.province) {
                    showNotification('Indique la provincia del remitente', { variant: "error" });
                    return;
                }
                if (!accompaniedPet.district) {
                    showNotification('Indique el distrito del remitente', { variant: "error" });
                    return;
                }
                if (!accompaniedPet.direction) {
                    showNotification('Indique la dirección del remitente', { variant: "error" });
                    return;
                }

                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        },
        {
            value: "Destino",
            component: <Box mb={4}>
                <DestinationFormGeneral notButton={notButton} />
                {
                    hasCharge &&
                    <ChargeFormGeneral notButton={notButton} />
                }
            </Box>,
            icon: <IconWrapper icon="arrival" width={24} />,
        },


    ], [getValues, showNotification]);

    return {
        steps
    };
};
