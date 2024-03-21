export const COLLECTIONS = {
    roles: 'roles',
    permissions: 'permissions',
    users: 'users',
    contracts: 'contracts',
    contractDetail: 'contract-detail',
    cages: 'cages',
    pets: 'pets',
    folders: 'folders',
} as const;

export type Collections = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
