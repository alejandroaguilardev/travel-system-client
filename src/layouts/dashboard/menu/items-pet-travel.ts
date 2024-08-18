import { paths } from '../../../app/routes/paths';
import { AuthGroup, AuthPermission } from '../../../modules/auth/domain/auth-permission';
import { User } from '../../../modules/users/domain/user';
import { ICONS_MENU } from './icons';
import { ItemMenu } from './types';
import { hasPermission } from './utils';



export const itemsOptions = (user: User | null): ItemMenu[] => {
    const options: ItemMenu[] = [];


    hasPermission(user, AuthGroup.CONTRACT_SENASA, AuthPermission.LIST) &&
        options.push({
            title: 'Historial SENASA',
            path: paths.dashboard.senasaHistory,
            icon: ICONS_MENU.analytics
        })

    hasPermission(user, AuthGroup.CONTRACT_TOPICO, AuthPermission.LIST) &&
        options.push({
            title: 'Historial Toma de Muestra',
            path: paths.dashboard.takingSampleHistory,
            icon: ICONS_MENU.analytics
        })

    hasPermission(user, AuthGroup.CONTRACTS, AuthPermission.LIST) &&
        options.push({
            title: 'Historial de contratos',
            path: paths.dashboard.contracts.root,
            icon: ICONS_MENU.analytics
        })
    hasPermission(user, AuthGroup.CLIENT, AuthPermission.LIST) && options.push({ title: 'Todos los clientes', path: paths.dashboard.clients.root, icon: ICONS_MENU.user });

    hasPermission(user, AuthGroup.PETS, AuthPermission.LIST) && options.push({ title: 'Todas las mascotas', path: paths.dashboard.pets.root, icon: ICONS_MENU.pet });

    return options;
}

