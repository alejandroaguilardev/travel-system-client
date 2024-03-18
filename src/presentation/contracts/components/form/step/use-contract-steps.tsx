import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import Iconify from '../../../../../components/iconify';
import { ContractFormGeneral } from "../general/contract-form-general";
import { ContractFormPet } from "../pet/contract-form-pet";
import { StepType } from '../../../../../components/stepper/types';
import { NewContract } from '../../../../../modules/contracts/domain/contract';
import { useMessage } from '../../../../../hooks/use-message';
import { ContractFormPrices } from '../prices/contract-form-prices';


export const useContractSteps = () => {
    const { getValues } = useFormContext<NewContract>();
    const { showNotification } = useMessage();

    const steps: StepType[] = useMemo(() => [
        {
            value: "Datos del contrato",
            component: <ContractFormGeneral />,
            icon: <Iconify icon="eva:person-add-outline" width={24} />,
            handleNext: (setActiveStep) => {
                const values = getValues();

                if (!values.startDate) {
                    showNotification('Seleccione una fecha de inicio para el contrato', { variant: "error" });
                    return;
                }
                if (!values.client) {
                    showNotification("El cliente no ha sido agregado correctamente", { variant: "error" });
                    return;
                }
                if (!values.adviser) {
                    showNotification("El asesor no ha sido seleccionado", { variant: "error" });
                    return;
                }
                setActiveStep((prevActiveStep) => prevActiveStep + 1)
            }
        },
        {
            value: "Detalles del contrato",
            component: <ContractFormPet />,
            icon: <Iconify icon="eva:settings-2-outline" width={24} />,
            handleNext: async (setActiveStep) => {
                const values = getValues();

                if (values.details.length === 0) {
                    showNotification('Debe agregar al menos una mascota', { variant: "error" });
                    return;
                }
                setActiveStep((prevActiveStep) => prevActiveStep + 1);

            }
        },
        {
            value: "Especificación de Precio",
            component: <ContractFormPrices />,
            icon: <Iconify icon="eva:monitor-outline" width={24} />,
        },

    ], [getValues, showNotification]);

    return {
        steps
    };
};
