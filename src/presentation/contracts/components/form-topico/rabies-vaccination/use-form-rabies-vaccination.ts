import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useHasSendEmail, useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../../modules/contracts/infrastructure/contract-detail.service";
import { RabiesReVaccinationContract, RabiesVaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { contractRabiesVaccinationUpdater } from "../../../../../modules/contracts/application/topico/rabies-vaccination-updater";
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { contractRabiesReVaccinationUpdater } from '../../../../../modules/contracts/application/topico/rabies-revaccination-updater';
import { fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';

type Props = {
    contractId: string;
    detail: ContractDetail;
    callback: (response: ContractDetailUpdateResponse) => void;
}

const validateExpectedDate = (date: Date | null): boolean => {
    if (date === null) {
        return false;
    }

    return fDayjs(date).isValid();
};

export const useFormRabiesVaccination = ({ contractId, detail, callback }: Props) => {
    const { showNotification } = useMessage();
    const [isExecuted, setsExecuted] = useState(false);

    const { hasSendEmail, onChangeHasSendEmail } = useHasSendEmail();
    const [expectedDate, setExpectedDate] = useState<Date | null>(detail.topico?.rabiesReVaccination?.date ?? null)


    const handleExpectedDate = (date: Date | null) => {
        setExpectedDate(date);
    }

    const onSubmit: SubmitHandler<RabiesVaccinationContract> = async (data) => {
        if (!validateExpectedDate(expectedDate)) {
            showNotification("Dene indicar la fecha programada para la revacuna", { variant: "error" });
            return;
        }
        try {
            const response = await contractRabiesVaccinationUpdater(contractDetailService)(contractId, detail.id, data)
            showNotification("Actualizado correctamente ");

            const reVaccinationData: RabiesReVaccinationContract = {
                ...detail.topico?.rabiesReVaccination!,
                date: expectedDate ?? undefined,
            }

            await contractRabiesReVaccinationUpdater(contractDetailService)(contractId, detail.id, reVaccinationData)
            showNotification("Actualizado correctamente ");

            if (hasSendEmail) {
                contractDetailService.mailTopicRabiesReVaccination(contractId, detail.id);
            }

            setsExecuted(true);
            callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        hasSendEmail,
        isExecuted,
        onSubmit,
        onChangeHasSendEmail,
        expectedDate,
        handleExpectedDate
    }
}
