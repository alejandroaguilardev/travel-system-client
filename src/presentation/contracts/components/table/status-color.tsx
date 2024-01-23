import { StatusDefinition } from '../../../../modules/contracts/domain/contract-status';
import { LabelColor } from '../../../../components/label/types';

export const statusColor = (status: StatusDefinition): LabelColor => {
    let color: LabelColor = "default";

    if (status === "pending") {
        return "warning"
    }
    if (status === "in-process") {
        return "info"
    }
    if (status === "completed") {
        return "success"

    }
    if (status === "canceled" || status === "suspended") {
        return "error"
    }

    return color;
}