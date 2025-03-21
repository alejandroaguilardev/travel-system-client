import { paths } from '../../../app/routes/paths';
import { AuthGroup, AuthPermission } from '../../../modules/auth/domain/auth-permission';
import { User } from '../../../modules/users/domain/user';
import { ICONS_MENU } from './icons';
import { ItemMenu, ItemSubMenu } from './types';
import { hasPermission } from './utils';


const itemsContractRegister = (user: User | null): ItemSubMenu[] => {
    const contractRegister: ItemSubMenu[] = [];

    hasPermission(user, AuthGroup.CONTRACTS, AuthPermission.CREATE) &&
        contractRegister.push({ title: 'Nuevo contrato', path: paths.dashboard.contracts.new });

    hasPermission(user, AuthGroup.CONTRACTS, AuthPermission.CREATE) &&
        contractRegister.push({ title: 'Asignar folio', path: paths.dashboard.contracts.number });
    hasPermission(user, AuthGroup.CONTRACTS, AuthPermission.CREATE) &&
        contractRegister.push({ title: 'Cuotas por Pagar', path: paths.dashboard.contracts.payList });
    return contractRegister;
}

const itemsDocumentation = (user: User | null): ItemSubMenu[] => {
    const documentation: ItemSubMenu[] = [];
    hasPermission(user, AuthGroup.CONTRACT_TOPICO, AuthPermission.LIST) &&
        documentation.push({ title: 'Topico', path: paths.dashboard.faseDocumentation.topico.list });

    hasPermission(user, AuthGroup.CONTRACT_TOPICO, AuthPermission.LIST) &&
        documentation.push({ title: 'Test serológico de rabia', path: paths.dashboard.faseDocumentation.testRabies.list });
    hasPermission(user, AuthGroup.CONTRACT_DOCUMENTATION, AuthPermission.LIST) &&
        documentation.push({ title: 'Documentación', path: paths.dashboard.faseDocumentation.documentation.list });
    hasPermission(user, AuthGroup.CONTRACT_SENASA, AuthPermission.LIST) &&
        documentation.push({ title: 'Inspección SENASA', path: paths.dashboard.faseDocumentation.senasa.list });
    hasPermission(user, AuthGroup.CONTRACT_FINISH, AuthPermission.LIST) &&
        documentation.push({ title: 'Contratos por finalizar', path: paths.dashboard.faseDocumentation.contract });
    return documentation;
}


export const itemsContracts = (user: User | null): ItemMenu[] => {
    const contracts: ItemMenu[] = [];
    const contractRegister = itemsContractRegister(user);
    const documentation = itemsDocumentation(user);

    if (contractRegister.length > 0) {
        contracts.push({
            title: 'Contratos',
            path: paths.dashboard.contracts.root,
            icon: ICONS_MENU.job,
            children: contractRegister,
        });
    }


    if (documentation.length > 0) {
        contracts.push({
            title: 'Fase Documentación',
            path: paths.dashboard.faseDocumentation.root,
            icon: ICONS_MENU.file,
            children: documentation,
        });
    }


    hasPermission(user, AuthGroup.CONTRACT_CAGE, AuthPermission.LIST) &&
        contracts.push({
            title: 'Fase Jaula',
            path: paths.dashboard.contractCage.list,
            icon: ICONS_MENU.kanban
        });
    hasPermission(user, AuthGroup.CONTRACT_TRAVEL, AuthPermission.LIST) &&
        contracts.push({
            title: 'Fase Reserva',
            path: paths.dashboard.contractTravel.list,
            icon: ICONS_MENU.calendar
        });


    return contracts
}
