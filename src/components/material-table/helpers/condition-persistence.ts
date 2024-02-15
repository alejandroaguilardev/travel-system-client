import { ServiceSearch } from '../../../modules/shared/domain/services/service-search';
import { COLLECTIONS, Collections } from '../../../modules/shared/domain/collections';
import { userService } from '../../../modules/users/infrastructure/user.service';
import { permissionService } from '../../../modules/permissions/infrastructure/permission.service';
import { roleService } from '../../../modules/roles/infrastructure/role.service';
import { contractService } from '../../../modules/contracts/infrastructure/contract.service';
import { cageService } from '../../../modules/cages/infrastructure/cages.service';

export const conditionPersistence = (collection: Collections): ServiceSearch => {
    switch (collection) {
        case COLLECTIONS.contracts:
            return contractService.search;
        case COLLECTIONS.users:
            return userService.search;
        case COLLECTIONS.roles:
            return roleService.search;
        case COLLECTIONS.permissions:
            return permissionService.search;
        case COLLECTIONS.cages:
            return cageService.search;
        default:
            throw new Error("No existe la colección");
    }

}