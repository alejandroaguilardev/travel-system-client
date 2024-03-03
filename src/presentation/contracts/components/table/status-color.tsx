import { ContractStatus } from '../../../../modules/contracts/domain/contract-status';
import { LabelColor } from '../../../../components/label/types';

export const statusColor = (status: ContractStatus): LabelColor => {
    let color: LabelColor = "default";

    if (status === "pending") {
        return "error"
    }
    if (status === "in-process") {
        return "error"
    }
    if (status === "completed") {
        return "success"

    }
    if (status === "canceled" || status === "suspended") {
        return "error"
    }

    return color;
}