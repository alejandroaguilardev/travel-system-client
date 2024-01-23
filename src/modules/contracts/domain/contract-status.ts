export type StatusDefinition = 'none' | 'pending' | 'in-process' | 'completed' | 'canceled' | 'suspended';

export const CONTRACT_STATUS: { value: StatusDefinition, label: string }[] = [
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