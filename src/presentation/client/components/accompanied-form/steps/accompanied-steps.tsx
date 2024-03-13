import { useAccompaniedSteps } from "./use-accompanied-steps"
import CustomizedSteppers from '../../../../../components/stepper/customized-stepper';
import { ActionsButtonsForm } from '../../../../../components/hook-form/actions-buttons-form';

type Props = {
    hasCharge: boolean;
    notButton: boolean;
}

export const AccompaniedStep = ({ hasCharge, notButton }: Props) => {
    const { steps } = useAccompaniedSteps({ hasCharge, notButton });

    return (
        <CustomizedSteppers
            steps={steps}
            notButton={notButton}
            componentFinish={<ActionsButtonsForm
                name="datos"
                edit
                fullWidth
                notCancel
                notReload
            />}
        />
    )
}
