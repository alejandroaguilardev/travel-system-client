export const CONTRACT_STATUS_IN_COURSE = [
    { id: "endDate", value: null },
] as const;


export const CONTRACT_STATUS_DOCUMENTATION_IN_COURSE = [
    { id: "details.cage", value: "pending" },
] as const;

export const CONTRACT_STATUS_CAGE_IN_COURSE = [
    { id: "status", value: "pending" },
] as const;
export const CONTRACT_STATUS_TRAVEL_IN_COURSE = [
    { id: "status", value: "pending" },
] as const;


export const CONTRACT_SORT_PENDING_DEFAULT = [
    { id: "correlative", desc: true },
    { id: "details.travel.airlineReservation.departureDate", desc: false },
    { id: "details.travel.airlineReservation.code", desc: true },
    { id: "estimatedDate", desc: false },
] as const;