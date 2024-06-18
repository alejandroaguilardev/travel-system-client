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
import { useLoadImage } from '../../../../../hooks/use-load-image';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { useLoadFile } from '../../../../../hooks/use-load-file';
import { Contract } from '../../../../../modules/contracts/domain/contract';

type Props = {
    contract: Contract;
    detail: ContractDetail;
    travel: Travel;
    callback: (response?: ContractDetailUpdateResponse) => void
    onCancel: () => void;
    adviser?: User;
    client: User;
    isUser?: boolean;
}

export const TravelForm: FC<Props> = ({ travel, detail, isUser, client, adviser, callback, onCancel, contract }) => {
    const departureDate = travel.airlineReservation?.departureDate ?? contract.estimatedDate;
    const methods = useForm({
        resolver: yupResolver<PartialTravel>(travelSchema),
        defaultValues: {
            ...travel,
            airlineReservation: {
                ...travel.airlineReservation,
                departureDate: departureDate ?? new Date(),
                departureAirport: travel.airlineReservation?.departureAirport || defaultValues.airlineReservation.departureAirport
            },
        },
    });

    const { onSubmit } = useFormTravel({ contractId: contract.id, detail, callback });
    const { imageFile } = useLoadImage("arraybuffer", "private", travel?.accompaniedPet?.image);
    const { archiveFile } = useLoadFile(travel?.airlineReservation?.archive);

    const editAccompaniedForm = isUser || isTravelAccompaniedFormEdit(travel);
    const editTravel = isUser || isTravelReserveFormEdit(travel);

    const tabs = [
        {
            value: "Datos del acompañante",
            component: <AccompaniedForm
                travel={travel}
                contractId={contract.id}
                contractDetailId={detail.id}
                callback={callback}
                notButton={!editAccompaniedForm}
            >
                {(editAccompaniedForm) ?
                    <AccompaniedStep hasCharge={travel?.typeTraveling === "charge"} notButton={false} status={travel?.status ?? "pending"} client={client} imagePassport={imageFile} isUser={editAccompaniedForm} />
                    :
                    <>
                        <AccompaniedFormGeneral notButton imagePassport={imageFile} />
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
                <TravelFormGeneral hasServiceIncluded={travel.hasServiceIncluded} pet={detail.pet} readonly={!editTravel} archiveFile={archiveFile} estimateDate={contract.estimatedDate} />
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
