import { FC, useMemo } from "react";
import { Alert } from "@mui/material";
import { TabGenericProvider, TabSwitcher } from "../../../../components/tab-generic";
import { MeasurementsAndWeightForm } from "./measurements-and-weight/measurements-and-weight-form";
import { ChipForm } from "./chip/chip-form";
import { VaccinationForm } from "./vaccination/vaccination-form";
import { ClientDialogProvider } from '../../../client/components/search-client/client-dialog-context';
import { ClientDialogForm } from '../../../client/components/search-client/client-dialog-form';
import { useDetailInfoContext } from "../../context/contract-detail-context";
import { RabiesVaccinationForm } from "./rabies-vaccination/rabies-vaccination-form";
import { RabiesReVaccinationForm } from "./rabies-revaccination/rabies-revaccination-form";
import { ChipReviewForm } from "./chip-review/chip-review-form";
import { TakingSampleSerologicalTestContractForm } from "./taking-sample-serological-test/taking-sample-form";


export const TOPICO_TABS = {
    measurementsAndWeightForm: "medidas",
    chip: "microchip",
    vaccination: "vaccination",
    rabiesVaccination: "rabiesVaccination",
    rabiesReVaccination: "rabiesReVaccination",
    chipReview: "chipReview",
    takingSampleSerologicalTest: "takingSampleSerologicalTest",
}


type Props = {
    action: string;
    contractId: string;
    onCancel: () => void;
}

export const TopicoForm: FC<Props> = ({ action, contractId, onCancel }) => {
    const { handleChangeDetailInfo, detail } = useDetailInfoContext();

    const tabs = useMemo(() => [
        {
            label: "Medidas y Peso",
            value: TOPICO_TABS.measurementsAndWeightForm,
            component: <MeasurementsAndWeightForm contractId={contractId} detail={detail}
                callback={() => false} onCancel={onCancel} />
        },
        {
            label: "Microchip",
            value: TOPICO_TABS.chip,
            component: <ChipForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
        {
            label: vaccinationLabel(detail.pet?.type),
            value: TOPICO_TABS.vaccination,
            component: <VaccinationForm contractId={contractId} detail={detail} title={vaccinationLabel(detail.pet?.type)}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
        {
            label: "Vacuna de Rabia",
            value: TOPICO_TABS.rabiesVaccination,
            component: <RabiesVaccinationForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
        {
            label: "Revacunación de Rabia ",
            value: TOPICO_TABS.rabiesReVaccination,
            component: <RabiesReVaccinationForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
        {
            label: "Revisión de Microchip",
            value: TOPICO_TABS.chipReview,
            component: <ChipReviewForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
        {
            label: "Toma de muestra",
            value: TOPICO_TABS.takingSampleSerologicalTest,
            component: <TakingSampleSerologicalTestContractForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
    ], [detail, handleChangeDetailInfo, contractId, onCancel, detail.pet?.type])


    return (
        <ClientDialogProvider>  {
            detail.pet?.id ?
                <TabGenericProvider defaultValue={action}>
                    <TabSwitcher
                        tabs={tabs}
                    />
                </TabGenericProvider>
                : <Alert variant='outlined' severity="error" sx={{ width: "100%" }}>
                    No se ha registrado la mascota en el sistema
                </Alert>
        }
            <ClientDialogForm />
        </ClientDialogProvider>
    )
}


const vaccinationLabel = (type?: string) => {

    if (!type) return "Vacuna";
    return type?.toLowerCase() === "perro" ? "Vacuna Quintuple" : "Vacuna triple";


}
