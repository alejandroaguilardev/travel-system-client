export const COLLECTIONS = {
    roles: 'roles',
    permissions: 'permissions',
    users: 'users',
    contracts: 'contracts',
    cages: 'cages',
} as const;

export type Collections = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
