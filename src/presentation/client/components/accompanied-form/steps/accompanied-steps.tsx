import { useAccompaniedSteps } from "./use-accompanied-steps"
import CustomizedSteppers from '../../../../../components/stepper/customized-stepper';
import { ActionsButtonsForm } from '../../../../../components/hook-form/actions-buttons-form';
import { ContractDetailStatus } from '../../../../../modules/contracts/domain/contract-status';
import { User } from '../../../../../modules/users/domain/user';

type Props = {
    hasCharge: boolean;
    notButton: boolean;
    status: ContractDetailStatus;
    client?: User;
}

export const AccompaniedStep = ({ hasCharge, notButton, status, client }: Props) => {
    const { steps } = useAccompaniedSteps({ hasCharge, notButton, client });

    return (
        <CustomizedSteppers
            steps={steps}
            notButton={notButton}
            componentFinish={<>
                {status !== "completed" &&
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
