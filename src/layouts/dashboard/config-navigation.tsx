import { useMemo } from 'react';
import { paths } from '../../app/routes/paths';
import SvgColor from '../../components/svg-color';
import { useAuthContext } from '../../presentation/auth/hooks/use-auth-context';
import { hasRolePermission } from '../../modules/roles/domain/role';
import { AuthGroup, AuthPermission } from '../../modules/auth/domain/auth-permission';
import { User } from '../../modules/users/domain/user';


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

const hasPermission = (user: User | null, group: AuthGroup, permission: AuthPermission): boolean => {
  const roles = user?.roles ?? [];
  if (user?.auth?.admin) return true;
  return hasRolePermission(roles, group, permission);
}


export function useNavData() {
  const { user } = useAuthContext();



  const data = useMemo(
    () => {
      const menu = [];
      const options = [];

      hasPermission(user, AuthGroup.CONTRACTS, AuthPermission.LIST) && options.push({ title: 'Contratos', path: paths.dashboard.contracts.root, icon: ICONS.dashboard })


      hasPermission(user, AuthGroup.CLIENT, AuthPermission.LIST) && options.push({ title: 'Clientes', path: paths.dashboard.clients.root, icon: ICONS.user });

      hasPermission(user, AuthGroup.PETS, AuthPermission.LIST) && options.push({ title: 'Mascotas', path: paths.dashboard.pets.root, icon: ICONS.blog });


      if (options.length > 0) {
        menu.push({
          subheader: 'Gestión Pet travel',
          items: options,
        })
      }

      const administration = [];
      const users = [];


      hasPermission(user, AuthGroup.USERS, AuthPermission.LIST) && users.push({ title: 'Usuarios', path: paths.dashboard.users.root });
      hasPermission(user, AuthGroup.ROLES, AuthPermission.LIST) && users.push({ title: 'Roles', path: paths.dashboard.roles.root });
      hasPermission(user, AuthGroup.PERMISSIONS, AuthPermission.LIST) && users.push({ title: 'Permisos', path: paths.dashboard.permissions.root });



      hasPermission(user, AuthGroup.CAGES, AuthPermission.LIST) && administration.push({ title: 'Jaulas', path: paths.dashboard.cages.root, icon: ICONS.kanban })


      if (users.length > 0) {
        administration.push({
          title: 'Usuarios y permisos',
          path: paths.dashboard.users.root,
          icon: ICONS.user,
          children: users,
        });
      }

      if (administration.length > 0) {
        menu.push({
          subheader: 'Administración del sistema',
          items: administration,
        })
      }


      return menu;


    },
    [user]
  );

  return data;
}
