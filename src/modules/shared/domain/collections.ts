export const COLLECTIONS = {
    roles: 'roles',
    permissions: 'permissions',
    users: 'users',
    contracts: 'contracts',
    cages: 'cages',
    pets: 'pets',
} as const;

export type Collections = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
