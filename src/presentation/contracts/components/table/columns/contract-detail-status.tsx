import { ContractDetail } from '../../../../../modules/contracts/domain/contract-detail';
import Label from '../../../../../components/label/label';

export const contractDetailStatus = (details: ContractDetail[], value: "travel" | "documentation" | "cage"): JSX.Element => {
    let pending = details?.length ?? 0;
    let completed = 0;
    details.forEach(_ => {
        completed += _?.[value]?.status === "completed" ? 1 : 0;
    })

    pending -= completed;
    return <>
        {pending > 0 &&
            <Label color="error">{pending > 1 ? pending : ""} Pendiente</Label>
        }
        {completed > 0 &&
            <Label color="success">{pending > 1 ? pending : ""}Completado</Label>
        }
    </>
}