import { useMemo } from 'react';
import { useAuthContext } from '../../presentation/auth/hooks/use-auth-context';
import { itemsContracts } from './menu/items-contracts';
import { itemsOptions } from './menu/items-pet-travel';
import { itemsAdministration } from './menu/items-administrator';


export function useNavData() {
  const { user } = useAuthContext();

  const data = useMemo(
    () => {
      const menu = [];
      const contracts = itemsContracts(user);
      const options = itemsOptions(user);
      const administration = itemsAdministration(user);


      if (contracts.length > 0) {
        menu.push({
          subheader: 'Contratos Activos',
          items: contracts,
        })
      }

      if (options.length > 0) {
        menu.push({
          subheader: 'Gestión Pet travel',
          items: options,
        })
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
