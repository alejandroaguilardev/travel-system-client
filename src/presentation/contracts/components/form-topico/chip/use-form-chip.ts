import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../../modules/contracts/infrastructure/contract-detail.service";
import { VaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { petService } from "../../../../../modules/pets/infrastructure/pets.service";
import { contractChipUpdater } from '../../../../../modules/contracts/application/topico/chip-updater';
import { certificateUpdater } from '../../../../../modules/contracts/application/update/certificate-updater';
import uuid from "src/modules/shared/infrastructure/adapter/uuid";
import { DocumentationCertificate } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { useAuthContext } from '../../../../auth/hooks/use-auth-context';

type Props = {
    contractId: string;
    detail: ContractDetail;
    petId: string;
    action: string,
    callback: (response: ContractDetailUpdateResponse) => void
}

export const useFormChip = ({ contractId, detail, petId, action, callback }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setsExecuted] = useState(false);
    const { user } = useAuthContext();

    const onSubmit: SubmitHandler<VaccinationContract> = async (data) => {
        try {
            const response = await contractChipUpdater(contractDetailService, petService)(contractId, detail.id, petId, data);


            const certificate: DocumentationCertificate = {
                ...detail.documentation.chipCertificate,
                isApplied: true,
                executionDate: data?.date ?? null,
            }
            certificateUpdater(contractDetailService, uuid)(contractId, detail.id, action, certificate, "pending", user?.id ?? "")

            showNotification("Actualizado correctamente ");
            callback(response);
            setsExecuted(true);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
        isExecuted,
    }
}
