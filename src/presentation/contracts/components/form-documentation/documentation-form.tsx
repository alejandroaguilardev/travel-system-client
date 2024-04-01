import { FC, useMemo } from "react"
import { ChipCertificateForm } from "./chip/chip-certificate-form";
import { DOCUMENTATION_KEYS } from '../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { TabGenericProvider } from '../../../../components/tab-generic/context/tab-generic-provider';
import { TabSwitcher } from '../../../../components/tab-generic/tab-switcher';
import { useDetailInfoContext } from "../../context/contract-detail-context";
import { VaccinationCertificateForm } from "./vaccination/vaccination-certificate";
import { RabiesTestSerologicalForm } from "./rabies/rabies-sero-logical-test";
import { ImportLicenseCertificateForm } from "./import-license/import-license";
import { HealthCertificateForm } from "./health-certificate/health-certificate";
import { SenasaDocumentsForm } from "./senasa/senasa-documents";
import { EmotionalSupportCertificateForm } from "./emotional-support/emotional-support";


type Props = {
    action: string;
    contractId: string;
    onCancel: () => void;
}

export const DocumentationContractForm: FC<Props> = ({ action, contractId, onCancel }) => {
    const { handleChangeDetailInfo, detail } = useDetailInfoContext();

    const tabs = useMemo(() => [
        {
            label: "Certificado de Microchip",
            value: DOCUMENTATION_KEYS.chipCertificate,
            component: <ChipCertificateForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
        {
            label: "Certificado de Vacuna",
            value: DOCUMENTATION_KEYS.vaccinationCertificate,
            component: <VaccinationCertificateForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
        {
            label: "Test serológico de rabia",
            value: DOCUMENTATION_KEYS.rabiesSeroLogicalTest,
            component: <RabiesTestSerologicalForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
        {
            label: "Permiso de importación",
            value: DOCUMENTATION_KEYS.importLicense,
            component: <ImportLicenseCertificateForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
        {
            label: "Certificado de salud",
            value: DOCUMENTATION_KEYS.healthCertificate,
            component: <HealthCertificateForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
        {
            label: "Documentos de SENASA",
            value: DOCUMENTATION_KEYS.senasaDocuments,
            component: <SenasaDocumentsForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
        {
            label: "Certificado de soporte emocional",
            value: DOCUMENTATION_KEYS.emotionalSupportCertificate,
            component: <EmotionalSupportCertificateForm contractId={contractId} detail={detail}
                callback={({ contractDetail }) => handleChangeDetailInfo(contractDetail)} onCancel={onCancel} />
        },
    ], [detail, handleChangeDetailInfo, contractId, onCancel, detail.pet?.type])


    return (
        <TabGenericProvider defaultValue={action}>
            <TabSwitcher
                tabs={tabs}
            />
        </TabGenericProvider>
    )
}
