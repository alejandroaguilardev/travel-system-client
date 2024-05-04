import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useHasSendEmail, useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../../modules/contracts/infrastructure/contract-detail.service";
import { TOPICO_KEYS, VaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { petService } from "../../../../../modules/pets/infrastructure/pets.service";
import { contractChipUpdater } from '../../../../../modules/contracts/application/topico/chip-updater';
import { certificateUpdater } from '../../../../../modules/contracts/application/update/certificate-updater';
import uuid from "src/modules/shared/infrastructure/adapter/uuid";
import { DocumentationCertificate } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { useAuthContext } from '../../../../auth/hooks/use-auth-context';
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { topicMessageMail } from '../../../helpers/topic-get-message';

type Props = {
    contractId: string;
    detail: ContractDetail;
    petId: string;
    hasServiceIncluded: boolean;
    callback: (response: ContractDetailUpdateResponse) => void
}

export const useFormChip = ({ contractId, detail, petId, callback, hasServiceIncluded }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setsExecuted] = useState(false);
    const { user } = useAuthContext();
    const { hasSendEmail, onChangeHasSendEmail } = useHasSendEmail(hasServiceIncluded);

    const onSubmit: SubmitHandler<VaccinationContract> = async (data) => {
        try {
            const response = await contractChipUpdater(contractDetailService, petService)(contractId, detail.id, petId, data);

            const certificate: DocumentationCertificate = {
                ...detail.documentation.chipCertificate,
                isApplied: true,
                executionDate: data?.date ?? null,
                resultDate: data?.date ?? null,
            }
            await certificateUpdater(contractDetailService, uuid)(contractId, detail.id, DOCUMENTATION_KEYS.chipCertificate, certificate, "pending", user?.id ?? "")

            if (hasSendEmail) {
                contractDetailService.mailDetail(contractId, detail.id, topicMessageMail(TOPICO_KEYS.chip));
            }

            showNotification("Actualizado correctamente ");
            callback(response);
            setsExecuted(true);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        hasSendEmail,
        onChangeHasSendEmail,
        onSubmit,
        isExecuted,
    }
}
