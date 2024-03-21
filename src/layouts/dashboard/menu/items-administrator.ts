import { paths } from '../../../app/routes/paths';
import { AuthGroup, AuthPermission } from '../../../modules/auth/domain/auth-permission';
import { User } from '../../../modules/users/domain/user';
import { ICONS_MENU } from './icons';
import { ItemMenu, ItemSubMenu } from './types';
import { hasPermission } from './utils';


const itemsUsers = (user: User | null): ItemSubMenu[] => {
    const users: ItemSubMenu[] = [];

    hasPermission(user, AuthGroup.USERS, AuthPermission.LIST) && users.push({ title: 'Usuarios', path: paths.dashboard.users.root });
    hasPermission(user, AuthGroup.ROLES, AuthPermission.LIST) && users.push({ title: 'Roles', path: paths.dashboard.roles.root });
    hasPermission(user, AuthGroup.PERMISSIONS, AuthPermission.LIST) && users.push({ title: 'Permisos', path: paths.dashboard.permissions.root });

    return users;
}



export const itemsAdministration = (user: User | null): ItemMenu[] => {
    const administration: ItemMenu[] = [];
    const users = itemsUsers(user);


    if (users.length > 0) {
        administration.push({
            title: 'Usuarios y permisos',
            path: paths.dashboard.users.root,
            icon: ICONS_MENU.user,
            children: users,
        });
    }


    hasPermission(user, AuthGroup.FOLDERS, AuthPermission.LIST) && administration.push({ title: 'Registrar Expedientes', path: paths.dashboard.folders.root, icon: ICONS_MENU.folder })
    hasPermission(user, AuthGroup.CAGES, AuthPermission.LIST) && administration.push({ title: 'Registrar Jaulas', path: paths.dashboard.cages.root, icon: ICONS_MENU.kanban })

    return administration;
}









