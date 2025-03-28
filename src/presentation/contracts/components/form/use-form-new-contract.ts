import { SubmitHandler } from "react-hook-form";
import { useRouter } from '../../../../app/routes/hooks/use-router';
import uuid from "../../../../modules/shared/infrastructure/adapter/uuid";
import { NewContract } from '../../../../modules/contracts/domain/contract';
import { contractCreator } from '../../../../modules/contracts/application/create/contract-creator';
import { contractService } from '../../../../modules/contracts/infrastructure/contract.service';
import { CustomFormEvent } from '../../../../components/hook-form/types';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { useMessage } from '../../../../hooks/use-message';
import { contractUpdater } from '../../../../modules/contracts/application/update/contract-updater';
import { useImpContractContext } from "../../../../components/imp-pdf/imp-contract/imp-contract-context";
import { TypeofImp } from "../../../../components/imp-pdf/imp-contract/type-contract";
import { ContractProps } from "../../pdf/format-contract/types";
import { NewContractEmail } from "./contract-validations";

type Props = {
    contract?: NewContract;
    callback: () => void;
}

export const useFormContract = ({ callback, contract }: Props) => {

    const { reload } = useRouter();
    const { showNotification, showSuccess } = useMessage();
    const { handleTypeImpExecute } = useImpContractContext<ContractProps>();

    const onSubmit: SubmitHandler<NewContractEmail> = async (data, event) => {
        const { hasSendEmail, isEdit, ...rest } = data;
        const { nativeEvent } = event as CustomFormEvent<HTMLFormElement>;
        try {
            const { message, contract: updateContract } = contract
                ? await contractUpdater(contractService, uuid)(rest?.id!, rest)
                : await contractCreator(contractService, uuid)(rest)

            if (!isEdit && hasSendEmail && updateContract?.id) {
                contractService.notificationNewContract(updateContract?.id);
            }

            handleTypeImpExecute(updateContract?.id ?? "", TypeofImp.IMP)
            showSuccess({ newTitle: message });
            nativeEvent.submitter?.value === "reload"
                ? setTimeout(() => reload(), 1500)
                : callback();
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };



    return {
        onSubmit,
    }
}
