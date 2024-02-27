import { Box } from "@mui/material";
import { useContractSteps } from "./use-contract-steps"
import CustomizedSteppers from '../../../../../components/stepper/customized-stepper';
import { ActionsButtonsForm } from '../../../../../components/hook-form/actions-buttons-form';
import { NewContract } from '../../../../../modules/contracts/domain/contract';

type Props = {
    contract?: NewContract;
}

export const ContractStep = ({ contract }: Props) => {
    const { steps } = useContractSteps();

    return (
        <Box mt={2}>
            <CustomizedSteppers
                steps={steps}
                componentFinish={<ActionsButtonsForm
                    name="contrato"
                    edit={!!contract}
                    fullWidth
                    notCancel
                />}
            />
        </Box>
    )
}
