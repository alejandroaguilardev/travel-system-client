import { TopicTabs } from '../../presentation/contracts/components/form-topico/topico-form';

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
      number: `${ROOTS.DASHBOARD_CONTRACT}/asignar-numero`,
      payList: `${ROOTS.DASHBOARD_CONTRACT}/pagos`,
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
        management: (id: string, action: string) => `${ROOTS.DASHBOARD_DOCUMENTATION}/documentacion/${id}/${action}/gestion`,
      },
      topico: {
        list: `${ROOTS.DASHBOARD_DOCUMENTATION}/topico`,
        management: (id: string, action: TopicTabs) => `${ROOTS.DASHBOARD_DOCUMENTATION}/topico/${id}/${action}/gestion`,
      },
      senasa: {
        list: `${ROOTS.DASHBOARD_DOCUMENTATION}/inspeccion-senasa`,
        update: (id: string) => `${ROOTS.DASHBOARD_DOCUMENTATION}/inspeccion-senasa/${id}`,
      },
      testRabies: {
        list: `${ROOTS.DASHBOARD_DOCUMENTATION}/test-serologico-rabia`,
        update: (id: string) => `${ROOTS.DASHBOARD_DOCUMENTATION}/test-serologico-rabia/${id}`,
      },
      contract: `${ROOTS.DASHBOARD_DOCUMENTATION}/contratos`,
    },
    contractCage: {
      list: `${ROOTS.DASHBOARD}/contratos-jaulas`,
      update: (id: string) => `${ROOTS.DASHBOARD}/contratos-jaulas/${id}`,
    },
    contractTravel: {
      list: `${ROOTS.DASHBOARD}/contratos-reservas`,
      update: (id: string) => `${ROOTS.DASHBOARD}/contratos-reservas/${id}`,
    },
    senasaHistory: `${ROOTS.DASHBOARD}/historial-senasa`,
    takingSampleHistory: `${ROOTS.DASHBOARD}/historial-test-serologico-rabia`,

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
    incidents: {
      root: `${ROOTS.DASHBOARD}/incidencias`,
      view: (id: string) => `${ROOTS.DASHBOARD}/incidencias/${id}/visualizar`,
      notification: `${ROOTS.DASHBOARD}/incidencias-notificaciones`,
      notificationView: (id: string) => `${ROOTS.DASHBOARD_USER}/incidencias-notificaciones/${id}/visualizar`,
    },
  },
};
