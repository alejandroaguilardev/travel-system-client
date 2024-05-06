import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useHasSendEmail, useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../../modules/contracts/infrastructure/contract-detail.service";
import { TOPICO_KEYS, VaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { contractVaccinationUpdater } from "../../../../../modules/contracts/application/topico/vaccunation-updater";
import { certificateUpdater } from '../../../../../modules/contracts/application/update/certificate-updater';
import { DocumentationCertificate } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import uuid from 'src/modules/shared/infrastructure/adapter/uuid';
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { useAuthContext } from '../../../../auth/hooks/use-auth-context';
import { topicMessageMail } from '../../../helpers/topic-get-message';

type Props = {
    contractId: string;
    detail: ContractDetail;
    hasServiceIncluded: boolean;
    callback: (response: ContractDetailUpdateResponse) => void;
}

export const useFormVaccination = ({ contractId, detail, hasServiceIncluded, callback }: Props) => {
    const { showNotification } = useMessage();
    const { user } = useAuthContext();

    const [isExecuted, setsExecuted] = useState(false);
    const { hasSendEmail, onChangeHasSendEmail } = useHasSendEmail(hasServiceIncluded);

    const onSubmit: SubmitHandler<VaccinationContract> = async (data) => {
        try {
            if (data.description) {
                data.executed = true;
            }
            const response = await contractVaccinationUpdater(contractDetailService)(contractId, detail.id, data);
            const certificate: DocumentationCertificate = {
                ...detail.documentation.chipCertificate,
                isApplied: true,
                executionDate: data?.date ?? null,
                resultDate: data?.date ?? null,
            }
            await certificateUpdater(contractDetailService, uuid)(contractId, detail.id, DOCUMENTATION_KEYS.vaccinationCertificate, certificate, "pending", user?.id ?? "")

            if (hasSendEmail) {
                contractDetailService.mailDetail(contractId, detail.id, topicMessageMail(TOPICO_KEYS.vaccination));
            }

            showNotification("Actualizado correctamente ");
            setsExecuted(true);
            callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        isExecuted,
        onSubmit,
        hasSendEmail,
        onChangeHasSendEmail
    }
}
