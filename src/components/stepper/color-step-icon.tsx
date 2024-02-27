import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Iconify from '../iconify';
import { bgGradient } from '../../theme/css';
import { StepType } from './types';



export const ColorLibStepIconRoot = styled('div')<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    zIndex: 1,
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.disabled,
    backgroundColor:
        theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
    ...(ownerState.active && {
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        color: theme.palette.common.white,
        ...bgGradient({
            startColor: theme.palette.error.light,
            endColor: theme.palette.error.main,
        }),
    }),
    ...(ownerState.completed && {
        color: theme.palette.common.white,
        ...bgGradient({
            startColor: theme.palette.error.light,
            endColor: theme.palette.error.main,
        }),
    }),
}));


export const ColorLibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            ...bgGradient({
                startColor: theme.palette.error.light,
                endColor: theme.palette.error.main,
            }),
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            ...bgGradient({
                startColor: theme.palette.error.light,
                endColor: theme.palette.error.main,
            }),
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        borderRadius: 1,
        backgroundColor: theme.palette.divider,
    },
}));



type Props = StepIconProps & {
    step: StepType;
}

export function ColorLibStepIcon(props: Props) {
    const { active, completed, className, icon, step } = props;

    return (
        <ColorLibStepIconRoot ownerState={{ completed, active }} className={className}>
            {step.icon}
        </ColorLibStepIconRoot>
    );
}