import { SubmitHandler } from "react-hook-form";
import { CustomFormEvent } from '../../../../components/hook-form/types';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { useMessage } from '../../../../hooks/use-message';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { AccompaniedPetUpdater } from '../../../../modules/contracts/application/travel/accompanied-pet';
import { contractDetailService } from '../../../../modules/contracts/infrastructure/contract-detail.service';
import { TravelAccompaniedSchema } from "./accompanied-validation";
import { ContractDetailUpdateResponse } from '../../../../modules/contracts/domain/contract-detail.service';

type Props = {
    contractId: string;
    contractDetailId: string;
    callback: (response?: ContractDetailUpdateResponse) => void
}

export const useAccompaniedForm = ({ contractId, contractDetailId, callback }: Props) => {

    const { reload } = useRouter();
    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<TravelAccompaniedSchema> = async (data, event) => {
        const { nativeEvent } = event as CustomFormEvent<HTMLFormElement>;
        try {
            const { accompaniedPet, destination, petPerCharge, observation = "" } = data;

            const response = await AccompaniedPetUpdater(contractDetailService)(contractId, contractDetailId, accompaniedPet, destination, petPerCharge, observation)
            showNotification("Actualizado con éxito");
            nativeEvent.submitter?.value === "reload"
                ? reload()
                : callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        onSubmit,
    }
}
