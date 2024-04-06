import { SubmitHandler } from "react-hook-form";
import { ContractDetailUpdateResponse } from '../../../../modules/contracts/domain/contract-detail.service';
import { useMessage } from '../../../../hooks/use-message';
import { DocumentationCertificate } from "../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate";
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import uuid from "../../../../modules/shared/infrastructure/adapter/uuid";
import { contractDetailService } from '../../../../modules/contracts/infrastructure/contract-detail.service';
import { certificateUpdater } from '../../../../modules/contracts/application/update/certificate-updater';
import { useState } from "react";
import { ContractStatus } from '../../../../modules/contracts/domain/contract-status';
import { useAuthContext } from '../../../auth/hooks/use-auth-context';

type Props = {
    contractId: string;
    detailId: string;
    action: string,
    status: ContractStatus,
    callback: (response: ContractDetailUpdateResponse) => void;
}

export const useFormCertificate = ({ contractId, detailId, action, status, callback }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setIsExecuted] = useState(false);
    const { user } = useAuthContext()

    const onSubmit: SubmitHandler<DocumentationCertificate> = async (data) => {
        try {
            const response = await certificateUpdater(contractDetailService, uuid)(contractId, detailId, action, data, status, user?.id ?? "")
            showNotification("Actualizado correctamente ");
            setIsExecuted(true);
            callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        isExecuted,
        onSubmit,
    }
}
