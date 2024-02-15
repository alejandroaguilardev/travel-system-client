import { useMemo } from 'react';
import { paths } from '../../app/routes/paths';
import SvgColor from '../../components/svg-color';


const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

export function useNavData() {
  const data = useMemo(
    () => [
      {
        subheader: 'Gestión Pet travel',
        items: [
          { title: 'Contratos', path: paths.dashboard.contracts.root, icon: ICONS.dashboard },
          { title: 'Jaulas', path: paths.dashboard.cages.root, icon: ICONS.product },
        ],
      },

      {
        subheader: 'Administración del sistema',
        items: [
          {
            title: 'Usuarios y permisos',
            path: paths.dashboard.users.root,
            icon: ICONS.user,
            children: [
              { title: 'Usuarios', path: paths.dashboard.users.root },
              { title: 'Roles', path: paths.dashboard.roles.root },
              { title: 'Permisos', path: paths.dashboard.permissions.root },
            ],
          },
        ],
      },
    ],
    []
  );

  return data;
}
