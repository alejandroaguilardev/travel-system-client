export enum AuthGroup {
    ADMIN = 'Administrador',
    CAGES = 'jaulas',
    CLIENT = 'clientes',
    CONTRACTS = 'contratos',
    CONTRACTS_DETAIL = 'detalles de contratos',
    PERMISSIONS = 'permisos',
    PETS = 'mascotas',
    ROLES = 'roles',
    USERS = 'usuarios',
    FOLDERS = 'expedientes',
    INCIDENTS = 'incidencias',

    CONTRACT_DOCUMENTATION = 'Fase Documentación',
    CONTRACT_TOPICO = 'Fase Topico',
    CONTRACT_CAGE = 'Fase Jaula',
    CONTRACT_TRAVEL = 'Fase Viaje',
    CONTRACT_FINISH = 'Finalizar Contratos',
    CONTRACT_SENASA = 'Inspección Senasa',
}

export enum AuthPermission {
    READ = 'leer',
    LIST = 'listar',
    CREATE = 'crear',
    EDIT = 'editar',
    DELETE = 'eliminar',
    EXECUTE = 'ejecutar',
}
