import { FC, useMemo } from "react"
import { ChipCertificateForm } from "./chip/chip-certificate-form";
import { DOCUMENTATION_KEYS } from '../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { TabGenericProvider } from '../../../../components/tab-generic/context/tab-generic-provider';
import { TabSwitcher } from '../../../../components/tab-generic/tab-switcher';
import { useDetailInfoContext } from "../../context/contract-detail-context";
import { VaccinationCertificateForm } from "./vaccination/vaccination-certificate";
import { ImportLicenseCertificateForm } from "./import-license/import-license";
import { HealthCertificateForm } from "./health-certificate/health-certificate";
import { EmotionalSupportCertificateForm } from "./emotional-support/emotional-support";
import { ContractDetail } from '../../../../modules/contracts/domain/contract-detail';


type Props = {
    action: string;
    contractId: string;
    detail: ContractDetail;
    onCancel: () => void;
}

export const DocumentationContractForm: FC<Props> = ({ action, contractId, detail, onCancel }) => {
    const { handleChangeContractInfo, contract } = useDetailInfoContext();

    const tabs = useMemo(() => [
        {
            label: "Certificado de Microchip",
            value: DOCUMENTATION_KEYS.chipCertificate,
            component: <ChipCertificateForm contractId={contractId} detail={detail} contract={contract}
                callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
        },
        {
            label: "Certificado de Vacuna",
            value: DOCUMENTATION_KEYS.vaccinationCertificate,
            component: <VaccinationCertificateForm contract={contract} detail={detail}
                callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
        },
        {
            label: "Permiso de importación",
            value: DOCUMENTATION_KEYS.importLicense,
            component: <ImportLicenseCertificateForm contractId={contractId} detail={detail}
                callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
        },
        {
            label: "Certificado de salud",
            value: DOCUMENTATION_KEYS.healthCertificate,
            component: <HealthCertificateForm contract={contract} contractId={contractId} detail={detail}
                callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
        },
        {
            label: "Certificado de soporte emocional",
            value: DOCUMENTATION_KEYS.emotionalSupportCertificate,
            component: <EmotionalSupportCertificateForm contractId={contractId} detail={detail}
                callback={({ contract }) => handleChangeContractInfo(contract)} onCancel={onCancel} />
        },
    ], [detail, contract, handleChangeContractInfo, contractId, onCancel, detail.pet?.type])


    return (
        <TabGenericProvider defaultValue={action}>
            <TabSwitcher
                tabs={tabs}
            />
        </TabGenericProvider>
    )
}
