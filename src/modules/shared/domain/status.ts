export const STATUS = ['active', 'inactive'] as const;

export type Status = typeof STATUS[number];
