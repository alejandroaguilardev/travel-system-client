import { SubmitHandler } from "react-hook-form";
import { useRouter } from '../../../../app/routes/hooks/use-router';
import uuid from "../../../../modules/shared/infrastructure/adapter/uuid";
import { NewContract } from '../../../../modules/contracts/domain/contract';
import { contractCreator } from '../../../../modules/contracts/application/create/contract-creator';
import { contractService } from '../../../../modules/contracts/infrastructure/contract.service';
import { CustomFormEvent } from '../../../../components/hook-form/types';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { useMessage } from '../../../../hooks/use-message';

type Props = {
    callback: () => void;
}

export const useFormContract = ({ callback }: Props) => {

    const { reload } = useRouter();
    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<NewContract> = async (data, event) => {
        const { nativeEvent } = event as CustomFormEvent<HTMLFormElement>;
        try {
            const response = await contractCreator(contractService, uuid)(data)

            showNotification(response.message);
            nativeEvent.submitter?.value === "reload"
                ? reload()
                : callback();
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
    }
}
