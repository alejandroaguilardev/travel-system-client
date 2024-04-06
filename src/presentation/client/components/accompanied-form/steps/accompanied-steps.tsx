import { useAccompaniedSteps } from "./use-accompanied-steps"
import CustomizedSteppers from '../../../../../components/stepper/customized-stepper';
import { ActionsButtonsForm } from '../../../../../components/hook-form/actions-buttons-form';
import { ContractStatus } from '../../../../../modules/contracts/domain/contract-status';

type Props = {
    hasCharge: boolean;
    notButton: boolean;
    status: ContractStatus
}

export const AccompaniedStep = ({ hasCharge, notButton, status }: Props) => {
    const { steps } = useAccompaniedSteps({ hasCharge, notButton });

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
