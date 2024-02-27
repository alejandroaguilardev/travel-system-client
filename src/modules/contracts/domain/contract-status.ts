export type ContractStatus = 'none' | 'pending' | 'in-process' | 'completed' | 'canceled' | 'suspended';

export const CONTRACT_STATUS: { value: ContractStatus, label: string }[] = [
    {
        value: "none",
        label: " NINGUNO"
    },
    {
        value: "pending",
        label: "PENDIENTE"
    },
    {
        value: "in-process",
        label: "EN PROCESO"
    },
    {
        value: "completed",
        label: "COMPLETADO"
    },
    {
        value: "canceled",
        label: "CANCELADO"
    },
    {
        value: "suspended",
        label: "SUSPENDIDO"
    },
]

export const statusError = (status: ContractStatus, endDate: Date | null) => {
    if (
        (status === 'canceled' ||
            status === 'none' ||
            status === 'suspended' ||
            status === 'completed')
        && endDate
    ) {
        return true;
    }
    return false;
}