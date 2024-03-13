import { ReactNode, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { ColorLibConnector, ColorLibStepIcon } from './color-step-icon';
import { StepType } from './types';

function getStepContent(steps: StepType[], step: number) {
    if (steps.length > step && step >= 0) {
        return steps[step].component;
    }
    throw new Error("error del steps");
}

type Props = {
    steps: StepType[];
    componentFinish: ReactNode;
    notButton?: boolean;
}

export default function CustomizedSteppers({ steps, notButton, componentFinish }: Props) {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (steps && steps[activeStep] && typeof steps[activeStep]?.handleNext === "function") {
            const ref = steps[activeStep].handleNext;
            if (ref) {
                ref(setActiveStep);
                return;
            }
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <>
            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorLibConnector />}>
                {steps.map((step) => (
                    <Step key={`${step.value}`}>
                        <StepLabel
                            StepIconComponent={(props) => ColorLibStepIcon({ ...props, step })}
                        >{
                                step.value}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            {activeStep === steps.length ? (
                <>
                    <Paper
                        sx={{
                            p: 3,
                            my: 3,
                            minHeight: 120,
                            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
                        }}
                    >
                        <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
                    </Paper>

                    <Button color="inherit" onClick={handleReset} sx={{ mr: 1 }}>
                        Reset
                    </Button>
                </>
            ) : (
                <>
                    {getStepContent(steps, activeStep)}

                    <Box display="flex" alignItems="center" >

                        <Button fullWidth disabled={activeStep === 0} variant='outlined' onClick={handleBack} sx={{ mr: 1 }}>
                            Regresar
                        </Button>
                        {activeStep === steps.length - 1
                            ? <>
                                {!notButton ? componentFinish : ""}
                            </>

                            : <Button fullWidth variant="contained" onClick={handleNext} sx={{ mr: 1 }}>
                                Siguiente
                            </Button>
                        }
                    </Box>
                </>
            )
            }
        </>
    );
}
