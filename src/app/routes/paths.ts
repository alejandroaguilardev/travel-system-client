const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  DASHBOARD_USER: '/dashboard/usuarios',
};


export const paths = {
  root: '/',
  client: {
    history: "historial"
  },
  auth: {
    login: `${ROOTS.AUTH}/login`,
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
    },
    clients: {
      root: `${ROOTS.DASHBOARD}/clientes`,
      new: `${ROOTS.DASHBOARD}/clientes/crear`,
      view: (id: string) => `${ROOTS.DASHBOARD}/clientes/${id}/visualizar`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/clientes/${id}/editar`,
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
    }
  },
};
