const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  DASHBOARD_USER: '/dashboard/usuarios',
};


export const paths = {
  root: '/',
  client: {
    history: "/historial",
    profile: "/perfil",
    changePassword: "seguridad"
  },
  auth: {
    login: `${ROOTS.AUTH}/login`,
    recover: `${ROOTS.AUTH}/recuperar`,
  },

  dashboard: {
    root: ROOTS.DASHBOARD,
    contracts: {
      root: `${ROOTS.DASHBOARD}/contratos`,
      new: `${ROOTS.DASHBOARD}/contratos/crear`,
      view: (id: string) => `${ROOTS.DASHBOARD}/contratos/${id}/visualizar`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/contratos/${id}/editar`,
      documentation: (id: string) => `${ROOTS.DASHBOARD}/contratos/${id}/documentacion`,
      cage: (id: string) => `${ROOTS.DASHBOARD}/contratos/${id}/jaula`,
      travel: (id: string) => `${ROOTS.DASHBOARD}/contratos/${id}/viaje`,
      client: (id: string) => `${ROOTS.DASHBOARD}/contratos/${id}/cliente`,
      pet: (id: string) => `${ROOTS.DASHBOARD}/contratos/${id}/mascota`,

    },
    clients: {
      root: `${ROOTS.DASHBOARD}/clientes`,
      new: `${ROOTS.DASHBOARD}/clientes/crear`,
      view: (id: string) => `${ROOTS.DASHBOARD}/clientes/${id}/visualizar`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/clientes/${id}/editar`,
    },
    cages: {
      root: `${ROOTS.DASHBOARD}/jaulas`,
      new: `${ROOTS.DASHBOARD}/jaulas/crear`,
      view: (id: string) => `${ROOTS.DASHBOARD}/jaulas/${id}/visualizar`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/jaulas/${id}/editar`,
    },
    pets: {
      root: `${ROOTS.DASHBOARD}/mascotas`,
      new: `${ROOTS.DASHBOARD}/mascotas/crear`,
      view: (id: string) => `${ROOTS.DASHBOARD}/mascotas/${id}/visualizar`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/mascotas/${id}/editar`,
    },
    users: {
      root: `${ROOTS.DASHBOARD_USER}`,
      new: `${ROOTS.DASHBOARD_USER}/crear`,
      view: (id: string) => `${ROOTS.DASHBOARD_USER}/${id}/visualizar`,
      edit: (id: string) => `${ROOTS.DASHBOARD_USER}/${id}/editar`,
    },
    roles: {
      root: `${ROOTS.DASHBOARD_USER}/roles`,
      new: `${ROOTS.DASHBOARD_USER}/roles/crear`,
      view: (id: string) => `${ROOTS.DASHBOARD_USER}/roles/${id}/visualizar`,
      edit: (id: string) => `${ROOTS.DASHBOARD_USER}/roles/${id}/editar`,
    },
    permissions: {
      root: `${ROOTS.DASHBOARD_USER}/permisos`,
      new: `${ROOTS.DASHBOARD_USER}/permisos/crear`,
      view: (id: string) => `${ROOTS.DASHBOARD_USER}/permisos/${id}/visualizar`,
      edit: (id: string) => `${ROOTS.DASHBOARD_USER}/permisos/${id}/editar`,
    },
  },
};
