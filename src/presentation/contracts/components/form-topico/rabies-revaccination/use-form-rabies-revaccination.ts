import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useHasSendEmail, useMessage } from "../../../../../hooks";
import { errorsShowNotification } from "../../../../../modules/shared/infrastructure/helpers/errors-show-notification";
import { ContractDetailUpdateResponse } from "../../../../../modules/contracts/domain/contract-detail.service";
import { contractDetailService } from "../../../../../modules/contracts/infrastructure/contract-detail.service";
import { RabiesReVaccinationContract } from '../../../../../modules/contracts/domain/contract-services/topico/contract-topico';
import { contractRabiesReVaccinationUpdater } from "../../../../../modules/contracts/application/topico/rabies-revaccination-updater";
import { fDaySum, fDayjs } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import { DocumentationCertificate } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation-certificate';
import uuid from 'src/modules/shared/infrastructure/adapter/uuid';
import { certificateUpdater } from '../../../../../modules/contracts/application/update/certificate-updater';
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';
import { useAuthContext } from '../../../../auth/hooks/use-auth-context';

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

export const useFormRabiesReVaccination = ({ contractId, detail, callback }: Props) => {
    const { showNotification } = useMessage();
    const { user } = useAuthContext();
    const [isExecuted, setsExecuted] = useState(false);
    const [expectedDate, setExpectedDate] = useState<Date | null>(
        detail.topico?.rabiesReVaccination.executed
            ? detail.documentation.rabiesSeroLogicalTest.expectedDate
            : fDaySum(new Date(), 30)
    );

    const { hasSendEmail, onChangeHasSendEmail } = useHasSendEmail();

    const handleExpectedDate = (date: Date | null) => {
        setExpectedDate(date);
    }


    const onSubmit: SubmitHandler<RabiesReVaccinationContract> = async (data) => {
        if (!validateExpectedDate(expectedDate)) {
            showNotification("Dene indicar la fecha programada de la toma de muestra ", { variant: "error" });
            return;
        }
        try {
            data.executed = true;
            await contractRabiesReVaccinationUpdater(contractDetailService)(contractId, detail.id, data)

            const takeSampleData: DocumentationCertificate = {
                ...detail.documentation?.rabiesSeroLogicalTest!,
                expectedDate: expectedDate,
            }

            const response = await certificateUpdater(contractDetailService, uuid)(contractId, detail.id, DOCUMENTATION_KEYS.rabiesSeroLogicalTest, takeSampleData, "pending", user?.id ?? "")

            showNotification("Actualizado correctamente ");
            if (hasSendEmail) {
                contractDetailService.mailTakingSample(contractId, detail.id);
            }
            setsExecuted(true);
            callback(response);
        } catch (error) {
            errorsShowNotification(error, showNotification)
        }
    };

    return {
        isExecuted,
        expectedDate,
        hasSendEmail,
        onSubmit,
        handleExpectedDate,
        onChangeHasSendEmail
    }
}
