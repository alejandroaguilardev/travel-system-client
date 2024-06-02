import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import Label from '../../../../../components/label/label';
import { fDate, fDayDiffDays } from '../../../../../modules/shared/infrastructure/helpers/format-time';
import { LabelColor } from '../../../../../components/label/types';


const valuesLabel = (pending: number, completed: number) => {
    return <>
        {pending > 0 &&
            <Label color="error">{pending > 1 ? pending : ""} Pendiente</Label>
        }
        {completed > 0 &&
            <Label color="success">{pending > 1 ? pending : ""}Completado</Label>
        }
    </>
}

export const contractDetailStatus = (details: ContractDetail[], value: "travel" | "documentation" | "cage"): JSX.Element => {
    let pending = details?.length ?? 0;
    let completed = 0;
    details.forEach(_ => {
        completed += _?.[value]?.status === "completed" ? 1 : 0;
    })

    pending -= completed;
    return valuesLabel(pending, completed)
}

export const contractDetailStatusClient = (details: ContractDetail[]): JSX.Element => {
    let pending = details?.length ?? 0;
    let completed = 0;
    details.forEach(_ => {
        completed += _?.documentation?.clientStatus === "completed" ? 1 : 0;
    })

    pending -= completed;
    return valuesLabel(pending, completed)
}


export const contractDetailsPetNames = (details: ContractDetail[]): JSX.Element => {
    const names = details.map(_ => _.pet?.name)

    return <>
        {names.join(", ")}
    </>
}



export const dateDepartureIsLastWeek = (dates: (Date | null)[]) => {
    return <>
        {dates.map(date => {
            if (!date) return <></>;
            const days = fDayDiffDays(date, new Date());
            const color: LabelColor = days > 6 ? "default" : 'error';
            return <Label color={color}>{fDate(date, 'DD/MM/YYYY')}</Label>
        })}
    </>
}