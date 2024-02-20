export enum AuthGroup {
    CAGES = 'jaulas',
    CLIENT = 'clientes',
    CONTRACTS = 'contratos',
    CONTRACTS_DETAIL = 'detalles de contratos',
    PERMISSIONS = 'permisos',
    PETS = 'mascotas',
    ROLES = 'roles',
    USERS = 'usuarios',
}

export enum AuthPermission {
    READ = 'leer',
    LIST = 'listar',
    CREATE = 'crear',
    EDIT = 'editar',
    DELETE = 'eliminar',

    FINISH = 'finalizar',
    DOCUMENTATION = 'documentación',
    CAGE = 'jaula',
    TRAVEL = 'viaje',
}
