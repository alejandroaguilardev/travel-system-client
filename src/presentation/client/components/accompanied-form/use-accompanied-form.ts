import { SubmitHandler } from "react-hook-form";
import { CustomFormEvent } from '../../../../components/hook-form/types';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { useMessage } from '../../../../hooks/use-message';
import { errorsShowNotification } from '../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import { AccompaniedPetUpdater } from '../../../../modules/contracts/application/travel/accompanied-pet';
import { contractDetailService } from '../../../../modules/contracts/infrastructure/contract-detail.service';
import { TravelAccompaniedSchema } from "./accompanied-validation";
import { ContractDetailUpdateResponse } from '../../../../modules/contracts/domain/contract-detail.service';
import { uploadImage } from '../../../../modules/shared/infrastructure/upload/upload-image';
import { useFileImageStore } from '../../../../state/upload/file-image-store';

type Props = {
    contractId: string;
    contractDetailId: string;
    callback: (response?: ContractDetailUpdateResponse) => void
}

export const useAccompaniedForm = ({ contractId, contractDetailId, callback }: Props) => {
    const { fileImage } = useFileImageStore();
    const { reload } = useRouter();
    const { showNotification } = useMessage();

    const onSubmit: SubmitHandler<TravelAccompaniedSchema> = async (data, event) => {
        const { nativeEvent } = event as CustomFormEvent<HTMLFormElement>;
        try {
            const { accompaniedPet, destination, petPerCharge, observation = "" } = data;
            let image = accompaniedPet?.image ?? ""
            if (fileImage) {
                image = await uploadImage(fileImage, `${accompaniedPet.document}-${accompaniedPet.documentNumber}`, "private");
            }
            console.log({ image })
            const response = await AccompaniedPetUpdater(contractDetailService)(contractId, contractDetailId, { ...accompaniedPet, image }, destination, petPerCharge, observation)
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
