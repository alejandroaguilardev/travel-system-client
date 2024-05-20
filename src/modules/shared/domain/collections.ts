export const COLLECTIONS = {
    roles: 'roles',
    permissions: 'permissions',
    users: 'users',
    contracts: 'contracts',
    contractDetail: 'contract-detail',
    cages: 'cages',
    pets: 'pets',
    folders: 'folders',
    incidents: 'incidents',
    incidentsNotification: 'incidents-notifications',
} as const;

export type Collections = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];
