import { SubmitHandler } from "react-hook-form";
import { useMessage } from "../../../../hooks";
import { errorsShowNotification } from "../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../modules/contracts/infrastructure/contract-detail.service";
import { ContractTopico } from "../../../../modules/contracts/domain/contract-services/topico/contract-topico";
import { contractTopicoUpdater } from "../../../../modules/contracts/application/update/topico-updater";

type Props = {
    contractId: string;
    detailId: string;
    callback: (response?: ContractDetailUpdateResponse) => void
}

export const useFormTopico = ({ contractId, detailId, callback }: Props) => {
    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<ContractTopico> = async (data) => {
        try {
            const response = await contractTopicoUpdater(contractDetailService)(contractId, detailId, data)
            showNotification("Actualizado correctamente ");
            callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
    }
}
