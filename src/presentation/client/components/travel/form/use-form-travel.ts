import { SubmitHandler } from "react-hook-form";
import { useMessage } from '../../../../../hooks/use-message';
import { errorsShowNotification } from '../../../../../modules/shared/infrastructure/helpers/errors-show-notification';
import uuid from "../../../../../modules/shared/infrastructure/adapter/uuid";
import { travelUpdater } from '../../../../../modules/contracts/application/update/travel-updater';
import { PartialTravel, TypeTraveling } from '../../../../../modules/contracts/domain/contract-services/travel/contract-travel';
import { contractDetailService } from '../../../../../modules/contracts/infrastructure/contract-detail.service';
import { ContractDetailUpdateResponse } from '../../../../../modules/contracts/domain/contract-detail.service';
import { uploadFile } from '../../../../../modules/shared/infrastructure/upload/upload-file';
import { useFileStore } from "../../../../../state/upload/file-store";
import { useFileImageStore } from '../../../../../state/upload/file-image-store';
import { uploadImage } from '../../../../../modules/shared/infrastructure/upload/upload-image';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { petUpdater } from '../../../../../modules/pets/application/update/pet-updater';
import { petService } from '../../../../../modules/pets/infrastructure/pets.service';

type Props = {
    contractId: string;
    detail: ContractDetail;
    callback: (response?: ContractDetailUpdateResponse) => void
}

export const useFormTravel = ({ contractId, detail, callback }: Props) => {
    const { showNotification } = useMessage();
    const { file } = useFileStore()
    const { fileImage } = useFileImageStore()

    const onSubmit: SubmitHandler<PartialTravel> = async (data) => {
        if (!validationDataPet()) return;
        if (!validationData(data?.typeTraveling, data.guideNumber)) return;
        if (!validationFiles(data.airlineReservation?.archive)) return;

        try {
            let image = detail.pet?.image ?? "";
            if (fileImage) {
                image = await uploadImage(fileImage!, `${detail.pet?.chip}`, "public");
            }

            let archive = data?.airlineReservation?.archive ?? "";
            if (file) {
                archive = await uploadFile(file!, `${detail.travel.destination.countryDestination} ${detail.id}`);
            }
            data.airlineReservation.archive = archive;




            const [response] = await Promise.all([
                travelUpdater(contractDetailService, uuid)(contractId, detail.id, data),
                petUpdater(petService, uuid)(detail.pet!.id!, { ...detail.pet!, image })
            ]);
            showNotification("Actualizado correctamente ");
            callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    const validationData = (typeTraveling?: TypeTraveling, guideNumber?: string) => {
        if (typeTraveling === "charge" && !guideNumber) {
            showNotification("Debe indicar el número de guía", { variant: "error" })
            return false;
        }
        return true;
    }

    const validationDataPet = (typeTraveling?: TypeTraveling, guideNumber?: string) => {
        if (typeTraveling === "charge" && !guideNumber) {
            showNotification("Debe indicar el número de guía", { variant: "error" })
            return false;
        }
        return true;
    }

    const validationFiles = (archive?: string) => {
        if (!file && !archive) {
            showNotification("Debe subir el comprobante de viaje", { variant: "error" })
            return false;
        }
        if (!fileImage && !detail.pet?.image) {
            showNotification("Debe seleccionar una imagen dela mascota", { variant: "error" })
            return false;
        }
        return true;
    }

    return {
        onSubmit,
    }
}
