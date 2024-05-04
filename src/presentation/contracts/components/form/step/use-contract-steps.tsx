import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import Iconify from '../../../../../components/iconify';
import { ContractFormGeneral } from "../general/contract-form-general";
import { ContractFormPet } from "../pet/contract-form-pet";
import { StepType } from '../../../../../components/stepper/types';
import { NewContract } from '../../../../../modules/contracts/domain/contract';
import { useMessage } from '../../../../../hooks/use-message';
import { ContractFormPrices } from '../prices/contract-form-prices';
import { countries } from '../../../../../modules/shared/domain/helpers/countries';


export const useContractSteps = () => {
    const { getValues, setValue } = useFormContext<NewContract>();
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
                let errorStep = false;
                values.details.forEach(_ => {
                    if (!_?.travel?.destination?.countryDestination) {
                        showNotification('Debe indicar el país destino', { variant: "error" });
                        errorStep = true;
                    }
                })
                if (errorStep) return;
                const format = formatContract(values.details?.[0].travel?.destination?.countryDestination);
                setValue("format", format);
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


const formatContract = (value?: string): string => {
    const country = countries.find(_ => value === _.name_es);
    if (!country) return "Europa";

    if (country.continent_en === "Europa") return country.continent_es;
    if (country.name_en === "United States" || country.name_en === "Canada") return country.continent_es;
    if (country.continent_en === "South America") return "América Latina";
    if (country.continent_en === "North America") return "América Latina";
    if (country.continent_en === "Asia") return country.continent_en;
    return "Europa"
}