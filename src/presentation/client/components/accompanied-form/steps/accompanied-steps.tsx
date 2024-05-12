import { useEffect } from "react";
import { useAccompaniedSteps } from "./use-accompanied-steps"
import CustomizedSteppers from '../../../../../components/stepper/customized-stepper';
import { ActionsButtonsForm } from '../../../../../components/hook-form/actions-buttons-form';
import { ContractDetailStatus } from '../../../../../modules/contracts/domain/contract-status';
import { User } from '../../../../../modules/users/domain/user';
import { useFileImageStore } from '../../../../../state/upload/file-image-store';

type Props = {
    hasCharge: boolean;
    notButton: boolean;
    status: ContractDetailStatus;
    imagePassport: string | null;
    client?: User;
    isUser?: boolean;
}

export const AccompaniedStep = ({ hasCharge, notButton, status, client, imagePassport, isUser }: Props) => {
    const { steps } = useAccompaniedSteps({ hasCharge, notButton, client, imagePassport });
    const { onChangeImageFile } = useFileImageStore();

    useEffect(() => {
        onChangeImageFile(null);
    }, []);

    return (
        <CustomizedSteppers
            steps={steps}
            notButton={notButton}
            componentFinish={<>
                {(status !== "completed" || isUser) &&
                    <ActionsButtonsForm
                        name="datos"
                        edit
                        fullWidth
                        notCancel
                        notReload
                    />
                }

            </>
            }
        />
    )
}
