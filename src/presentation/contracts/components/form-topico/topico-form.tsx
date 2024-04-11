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
import { Pet } from '../../../../modules/pets/domain/pet';
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';


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
    detail: ContractDetail;
    action: string;
    contractId: string;
    onCancel: () => void;
}

export const TopicoForm: FC<Props> = ({ action, contractId, detail, onCancel }) => {
    const { contract, handleChangeContractInfo } = useDetailInfoContext();

    const tabs = useMemo(() => {
        const addTabs = [{
            label: "Medidas y Peso",
            value: TOPICO_TABS.measurementsAndWeightForm,
            component: <MeasurementsAndWeightForm contractId={contractId} detail={detail}
                callback={(pet: Pet) => {
                    handleChangeContractInfo({
                        ...contract,
                        details: contract.details.map((_) => {
                            if (_.id === detail.id) {
                                return { ...detail, pet }
                            }
                            return _;
                        }
                        )
                    })
                }} onCancel={onCancel} />
        }];
        if (detail.documentation.chipCertificate.hasServiceIncluded) {
            addTabs.push({
                label: "Microchip",
                value: TOPICO_TABS.chip,
                component: <ChipForm contractId={contractId} detail={detail}
                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
        }
        if (detail.documentation.vaccinationCertificate.hasServiceIncluded) {
            addTabs.push({
                label: vaccinationLabel(detail.pet?.type),
                value: TOPICO_TABS.vaccination,
                component: <VaccinationForm contractId={contractId} detail={detail} title={vaccinationLabel(detail.pet?.type)}
                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
        }
        if (detail.documentation.rabiesSeroLogicalTest.hasServiceIncluded) {
            addTabs.push({
                label: "Vacuna de Rabia",
                value: TOPICO_TABS.rabiesVaccination,
                component: <RabiesVaccinationForm contractId={contractId} detail={detail}
                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
            addTabs.push({
                label: "Revacunación de Rabia ",
                value: TOPICO_TABS.rabiesReVaccination,
                component: <RabiesReVaccinationForm contractId={contractId} detail={detail}
                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
        }

        if (detail.documentation.chipCertificate.hasServiceIncluded) {
            addTabs.push({
                label: "Revisión de Microchip",
                value: TOPICO_TABS.chipReview,
                component: <ChipReviewForm contractId={contractId} detail={detail}
                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
        }

        if (detail.documentation.rabiesSeroLogicalTest.hasServiceIncluded) {
            addTabs.push({
                label: "Toma de muestra",
                value: TOPICO_TABS.takingSampleSerologicalTest,
                component: <TakingSampleSerologicalTestContractForm contractId={contractId} detail={detail}
                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
        }
        return addTabs;
    }, [contract, detail])

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
    return type?.toLowerCase() === "perro" ? "Vacuna Quintuple" : "Vacuna triple felina";


}
