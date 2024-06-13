import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import Label from '../../../../../components/label/label';
import { fDate, fDayDiffDays } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { LabelColor } from '../../../../../components/label/types';
import { Fragment } from 'react/jsx-runtime';
import { DOCUMENTATION_KEYS } from '../../../../../modules/contracts/domain/contract-services/documentation/documentation';


export const valuesLabel = ({ completed, pending }: { pending: number, completed: number }) => {
    return <>
        {pending > 0 &&
            <Label color="error">{pending > 1 ? pending : ""} Pendiente</Label>
        }
        {completed > 0 &&
            <Label color="success">{pending > 1 ? pending : ""}Completado</Label>
        }
    </>
}
export const valuesStatus = ({ completed, pending }: { pending: number, completed: number }) => {
    let valuePending = ``;
    if (pending > 0) {
        valuePending += `${pending > 1 ? pending : ""} Pendiente `;
    }

    if (completed > 0) {
        valuePending += `${completed > 1 ? completed : ""} Completado`;
    }
    return valuePending;
}


export const contractDetailStatus = (details: ContractDetail[], value: "travel" | "documentation" | "cage"): { pending: number, completed: number } => {
    let pending = details?.length ?? 0;
    let completed = 0;
    details.forEach(_ => {
        completed += _?.[value]?.status === "completed" ? 1 : 0;
    })

    pending -= completed;
    return { pending, completed };
}

export const contractDetailStatusClient = (details: ContractDetail[]): { pending: number, completed: number } => {
    let pending = details?.length ?? 0;
    let completed = 0;
    details.forEach(_ => {
        completed += _?.documentation?.clientStatus === "completed" ? 1 : 0;
    })

    pending -= completed;
    return { pending, completed };
}


export const contractDetailsPetNames = (details: ContractDetail[]) => {
    const names = details.map(_ => _.pet?.name)
    return names.join(", ")
}



export const dateDepartureIsLastWeek = (dates: (Date | null)[]) => {
    return dates.map((date) => {
        const days = fDayDiffDays(date, new Date());
        const color: LabelColor = days > 6 ? "default" : 'error';
        return { color, date: date ? fDate(date, 'DD/MM/YYYY') : "" }
    })
}
export const dateDepartureIsLastWeekLabel = (dates: ({ color: LabelColor, date: string })[]) => {
    return dates.map(({ color, date }, i) => {
        if (!date) return <Fragment key={i}></Fragment>;
        return <Label color={color} key={i}>{date}</Label>
    })
}




export const detailsStatus = (details: ContractDetail[], value: keyof typeof DOCUMENTATION_KEYS): { pending: number, completed: number } => {
    let pending = details?.length ?? 0;
    let completed = 0;
    details.forEach(_ => {
        completed += _.documentation?.[value]?.isApplied ? 1 : 0;
    })

    pending -= completed;
    return { pending, completed };
}
