import { paths } from '../../../app/routes/paths';
import { AuthGroup, AuthPermission } from '../../../modules/auth/domain/auth-permission';
import { User } from '../../../modules/users/domain/user';
import { ICONS_MENU } from './icons';
import { ItemMenu } from './types';
import { hasPermission } from './utils';



export const itemsOptions = (user: User | null): ItemMenu[] => {
    const options: ItemMenu[] = [];

    hasPermission(user, AuthGroup.CLIENT, AuthPermission.LIST) && options.push({ title: 'Todos los clientes', path: paths.dashboard.clients.root, icon: ICONS_MENU.user });

    hasPermission(user, AuthGroup.PETS, AuthPermission.LIST) && options.push({ title: 'Todas las mascotas', path: paths.dashboard.pets.root, icon: ICONS_MENU.pet });

    hasPermission(user, AuthGroup.CONTRACTS, AuthPermission.LIST) &&
        options.push({
            title: 'Historial de contratos',
            path: paths.dashboard.contractHistory,
            icon: ICONS_MENU.analytics
        })

    return options;
}

