import { FC, useMemo } from "react";
import { Alert } from "@mui/material";
import { Pet } from '../../../../modules/pets/domain/pet';
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';
import { TabGenericProvider, TabSwitcher } from "../../../../components/tab-generic";
import { ClientDialogProvider } from '../../../client/components/search-client/client-dialog-context';
import { ClientDialogForm } from '../../../client/components/search-client/client-dialog-form';
import { useDetailInfoContext } from "../../context/contract-detail-context";
import { ChipForm } from "./chip/chip-form";
import { VaccinationForm } from "./vaccination/vaccination-form";
import { RabiesVaccinationForm } from "./rabies-vaccination/rabies-vaccination-form";
import { RabiesReVaccinationForm } from "./rabies-revaccination/rabies-revaccination-form";
import { ChipReviewForm } from "./chip-review/chip-review-form";
import { TakingSampleSerologicalTestContractForm } from "./taking-sample-serological-test/taking-sample-form";
import { PetSelectedTopic } from "./pet-selected-topic/pet-selected-topic";
import { contractPetUpdater } from '../../../../modules/contracts/application/update/contract-pet-updater';
import { contractDetailService } from '../../../../modules/contracts/infrastructure/contract-detail.service';
import { hasIncludedServiceTopico, hasShowReviewChip } from '../../../../modules/contracts/domain/contract-services/topico/contract-topico';


export enum TopicTabs {
    admission = "admission",
    chip = "microchip",
    vaccination = "vaccination",
    rabiesVaccination = "rabiesVaccination",
    rabiesReVaccination = "rabiesReVaccination",
    chipReview = "chipReview",
    takingSampleSerologicalTest = "takingSampleSerologicalTest",
}

type Props = {
    detail: ContractDetail;
    action: string;
    contractId: string;
    clientId: string;
    onCancel: () => void;
}

export const TopicoForm: FC<Props> = ({ action, contractId, clientId, detail, onCancel }) => {
    const { contract, handleChangeContractInfo } = useDetailInfoContext();

    const tabs = useMemo(() => {
        const addTabs = [{
            label: "Admisión Mascota",
            value: TopicTabs.admission,
            component: <>
                <PetSelectedTopic adopterId={clientId} pet={detail?.pet}
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
                        contractPetUpdater(contractDetailService)(contractId, detail.id, pet?.id);

                    }} onCancel={onCancel}
                />
            </>
        }];
        if (!detail.pet?.id) return addTabs;

        const isChip = hasIncludedServiceTopico(contract, detail, "chip", "chipCertificate");
        if (isChip) {
            addTabs.push({
                label: "Microchip",
                value: TopicTabs.chip,
                component: <ChipForm contract={contract} detail={detail}
                    hasServiceIncluded={isChip}
                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
        }

        const isVaccination = hasIncludedServiceTopico(contract, detail, "vaccination", "vaccinationCertificate");
        if (isVaccination) {
            addTabs.push({
                label: vaccinationLabel(detail.pet?.type),
                value: TopicTabs.vaccination,
                component: <VaccinationForm contract={contract} detail={detail} title={vaccinationLabel(detail.pet?.type)}
                    hasServiceIncluded={isVaccination}
                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
        }
        const isRabiesVaccination = hasIncludedServiceTopico(contract, detail, "rabiesVaccination", "rabiesSeroLogicalTest");
        if (isRabiesVaccination) {
            addTabs.push({
                label: "Vacuna de Rabia",
                value: TopicTabs.rabiesVaccination,
                component: <RabiesVaccinationForm contract={contract} detail={detail}
                    hasServiceIncluded={isRabiesVaccination}
                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
        }
        const isRabiesReVaccination = hasIncludedServiceTopico(contract, detail, "rabiesReVaccination", "rabiesSeroLogicalTest");
        if (isRabiesReVaccination) {
            addTabs.push({
                label: "Revacunación de Rabia ",
                value: TopicTabs.rabiesReVaccination,
                component: <RabiesReVaccinationForm contractId={contractId} detail={detail}
                    hasServiceIncluded={isRabiesReVaccination}
                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
        }

        if (hasShowReviewChip(contract, detail)) {
            addTabs.push({
                label: "Revisión de Microchip",
                value: TopicTabs.chipReview,
                component: <ChipReviewForm contractId={contractId} detail={detail}
                    hasShowReviewChip={hasShowReviewChip(contract, detail)}
                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
        }
        const isTakingSampleSerologicalTest = hasIncludedServiceTopico(contract, detail, "takingSampleSerologicalTest", "rabiesSeroLogicalTest");
        if (isTakingSampleSerologicalTest) {
            addTabs.push({
                label: "Toma de muestra",
                value: TopicTabs.takingSampleSerologicalTest,
                component: <TakingSampleSerologicalTestContractForm contractId={contractId} detail={detail}
                    hasServiceIncluded={isTakingSampleSerologicalTest}

                    callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
            })
        }
        return addTabs;
    }, [contract, detail])

    return (
        <ClientDialogProvider>
            {!detail.pet?.id && <Alert variant='outlined' severity="error" sx={{ width: "100%" }}>
                No se ha registrado la mascota en el contrato</Alert>}
            <TabGenericProvider defaultValue={detail.pet?.id ? action : TopicTabs.admission}>
                <TabSwitcher
                    tabs={tabs}
                />
            </TabGenericProvider>
            <ClientDialogForm />
        </ClientDialogProvider>
    )
}


const vaccinationLabel = (type?: string) => {

    if (type?.toLowerCase() === "canino") return "Vacuna Quintuple";
    if (type?.toLowerCase() === "felino") return "Vacuna triple felina";
    return "Vacuna";

}
