import { SubmitHandler } from "react-hook-form";
import { ContractDetailUpdateResponse } from '../../../../modules/contracts/domain/contract-detail.service';
import { useMessage } from '../../../../hooks/use-message';
import { DocumentationCertificate } from "../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate";
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import uuid from "../../../../modules/shared/infrastructure/adapter/uuid";
import { contractDetailService } from '../../../../modules/contracts/infrastructure/contract-detail.service';
import { certificateUpdater } from '../../../../modules/contracts/application/update/certificate-updater';
import { useState } from "react";
import { ContractDetailStatus } from '../../../../modules/contracts/domain/contract-status';
import { useAuthContext } from '../../../auth/hooks/use-auth-context';
import { useHasSendEmail } from '../../../../hooks/use-has-send-email';
import { topicMessageMail } from "../../helpers/topic-get-message";

type Props = {
    contractId: string;
    detailId: string;
    action: string,
    status: ContractDetailStatus,
    callback: (response: ContractDetailUpdateResponse) => void;
    setIsLoading?: (isLoading: boolean) => void;
}

export const useFormCertificate = ({ contractId, detailId, action, status, callback, setIsLoading }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setIsExecuted] = useState(false);
    const { user } = useAuthContext()
    const { hasSendEmail, onChangeHasSendEmail } = useHasSendEmail();

    const onSubmit: SubmitHandler<DocumentationCertificate> = async (data) => {
        if (setIsLoading) setIsLoading(true);
        try {
            const response = await certificateUpdater(contractDetailService, uuid)(contractId, detailId, action, data, status, user?.id ?? "")
            showNotification("Actualizado correctamente ");
            setIsExecuted(true);
            if (hasSendEmail) {
                data.isApplied
                    ? contractDetailService.mailDetail(contractId, detailId, topicMessageMail(action))
                    : contractDetailService.mailSenasaIntroduceContract(contractId, detailId);
            }
            callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        } finally {
            if (setIsLoading) setIsLoading(false);
        }
    };

    return {
        isExecuted,
        hasSendEmail,
        onSubmit,
        onChangeHasSendEmail
    }
}
