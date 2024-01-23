import { Criteria } from "./criteria";

export const criteriaFactory = (criteria?: Partial<Criteria>): Criteria => ({
    filters: criteria?.filters ?? [],
    globalFilter: criteria?.globalFilter ?? "",
    globalFilterProperties: criteria?.globalFilterProperties ?? [],
    selectProperties: criteria?.selectProperties ?? [],
    size: criteria?.size ?? 10,
    start: criteria?.start ?? 0,
    sorting: criteria?.sorting ?? [],
})