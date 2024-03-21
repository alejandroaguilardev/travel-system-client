const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
  DASHBOARD_USER: '/dashboard/usuarios',
  DASHBOARD_CONTRACT: '/dashboard/contratos',
  DASHBOARD_DOCUMENTATION: '/dashboard/fase-documentacion',
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
      root: `${ROOTS.DASHBOARD_CONTRACT}`,
      assignPet: `${ROOTS.DASHBOARD_CONTRACT}/seleccionar-mascota`,
      number: `${ROOTS.DASHBOARD_CONTRACT}/asignar-numero`,
      view: (id: string) => `${ROOTS.DASHBOARD_CONTRACT}/${id}/visualizar`,
      edit: (id: string) => `${ROOTS.DASHBOARD_CONTRACT}/${id}/editar`,
      client: (id: string) => `${ROOTS.DASHBOARD_CONTRACT}/${id}/cliente`,
      pet: (id: string) => `${ROOTS.DASHBOARD_CONTRACT}/${id}/mascota`,
      new: `${ROOTS.DASHBOARD_CONTRACT}/crear`,
    },
    faseDocumentation: {
      root: ROOTS.DASHBOARD_DOCUMENTATION,
      documentation: {
        list: `${ROOTS.DASHBOARD_DOCUMENTATION}/documentacion`,
        update: (id: string) => `${ROOTS.DASHBOARD_DOCUMENTATION}/documentacion/${id}`,
      },
      topico: {
        list: `${ROOTS.DASHBOARD_DOCUMENTATION}/topico`,
        update: (id: string) => `${ROOTS.DASHBOARD_DOCUMENTATION}/topico/${id}`,
      },
      senasa: {
        list: `${ROOTS.DASHBOARD_DOCUMENTATION}/inspeccion-senasa`,
        update: (id: string) => `${ROOTS.DASHBOARD_DOCUMENTATION}/inspeccion-senasa/${id}`,
      },
    },
    contractCage: {
      list: `${ROOTS.DASHBOARD}/contratos-jaulas`,
      update: (id: string) => `${ROOTS.DASHBOARD_CONTRACT}/contratos-jaulas/${id}`,
    },
    contractTravel: {
      list: `${ROOTS.DASHBOARD}/contratos-reservas`,
      update: (id: string) => `${ROOTS.DASHBOARD_CONTRACT}/contratos-reservas/${id}`,
    },
    contractHistory: `${ROOTS.DASHBOARD}/contratos-historial`,
    contractFinish: `${ROOTS.DASHBOARD}/contratos-finalizar`,

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
    folders: {
      root: `${ROOTS.DASHBOARD}/expedientes`,
      new: `${ROOTS.DASHBOARD}/expedientes/crear`,
      view: (id: string) => `${ROOTS.DASHBOARD}/expedientes/${id}/visualizar`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/expedientes/${id}/editar`,
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
