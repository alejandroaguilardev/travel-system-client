import { FC } from "react"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from '../../../../../components/hook-form/form-provider';
import { Box, Button } from "@mui/material";
import { useFormTravel } from "./use-form-travel";
import { travelSchema, defaultValues } from "./travel-validation";
import { TravelFormGeneral } from './general/travel-form-general';
import { PartialTravel, Travel } from '../../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import { TabGenericProvider } from '../../../../../components/tab-generic/context/tab-generic-provider';
import { TabSwitcher } from '../../../../../components/tab-generic/tab-switcher';
import { AccompaniedForm } from "../../accompanied-form/accompanied-form";
import { AccompaniedFormGeneral } from "../../accompanied-form/steps/accompanied-form-general";
import { DestinationFormGeneral } from "../../accompanied-form/steps/destination-form";
import { ChargeFormGeneral } from '../../accompanied-form/steps/charge-form-general';
import { AccompaniedStep } from "../../accompanied-form/steps/accompanied-steps";
import { User, getLinkWhatApp } from '../../../../../modules/users/domain/user';
import { ContactWhatsApp } from "../../../../../components/contact-whats-app/contact-whats-app";
import { isTravelAccompaniedFormEdit, isTravelReserveFormEdit } from "./travel-utils";

type Props = {
    contractId: string;
    detailId: string;
    travel: Travel;
    callback: (response?: ContractDetailUpdateResponse) => void
    onCancel: () => void;
    adviser?: User;
    client: User;
    isUser?: boolean;

}


export const TravelForm: FC<Props> = ({ travel, detailId, isUser, client, adviser, callback, onCancel, contractId }) => {
    const methods = useForm({
        resolver: yupResolver<PartialTravel>(travelSchema),
        defaultValues: {
            ...travel,
            airlineReservation: {
                ...travel.airlineReservation,
                departureAirport: travel.airlineReservation?.departureAirport || defaultValues.airlineReservation.departureAirport
            },
        },
    });


    const { onSubmit } = useFormTravel({ contractId, detailId, callback });


    const editAccompaniedForm = isUser || isTravelAccompaniedFormEdit(travel);
    const editTravel = isUser || isTravelReserveFormEdit(travel);

    const tabs = [
        {
            value: "Datos del acompañante",
            component: <AccompaniedForm
                travel={travel}
                contractId={contractId}
                contractDetailId={detailId}
                callback={callback}
                notButton={!editAccompaniedForm}
            >
                {(editAccompaniedForm) ?
                    <AccompaniedStep hasCharge={travel?.typeTraveling === "charge"} notButton={false} status={travel?.status ?? "pending"} client={client} />
                    :
                    <>
                        <AccompaniedFormGeneral notButton />
                        <DestinationFormGeneral notButton />
                        {travel?.typeTraveling === "charge" &&
                            <ChargeFormGeneral notButton />
                        }
                        <ContactWhatsApp url={getLinkWhatApp(adviser)} text="Contactar Asesor" />
                    </>
                }

            </AccompaniedForm>

        },
        {
            value: "Reserva",
            component: <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)} >
                <TravelFormGeneral hasServiceIncluded={travel.hasServiceIncluded} readonly={!editTravel} />
                {(editTravel) ?
                    <Box display="flex" gap={1} justifyContent="center" mb={4}>
                        <Button variant="outlined" disabled={methods.formState.isSubmitting} fullWidth onClick={onCancel} >
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained" disabled={methods.formState.isSubmitting} fullWidth >
                            Actualizar
                        </Button>
                    </Box>
                    : <ContactWhatsApp url={getLinkWhatApp(adviser)} text="Contactar Asesor" />
                }
            </FormProvider>
        },
    ]

    return (
        <TabGenericProvider defaultValue={tabs[0].value}>
            <TabSwitcher
                tabs={tabs}
            />
        </TabGenericProvider>
    )
}
