import { useAccompaniedSteps } from "./use-accompanied-steps"
import CustomizedSteppers from '../../../../../components/stepper/customized-stepper';
import { ActionsButtonsForm } from '../../../../../components/hook-form/actions-buttons-form';


export const AccompaniedStep = () => {
    const { steps } = useAccompaniedSteps();

    return (
        <CustomizedSteppers
            steps={steps}
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
