import { ReactNode } from 'react';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { paths } from '../../../../app/routes/paths';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';

type Props = {
    onSelected: (contract: Contract) => void;
    deleteItem: () => void;
    row: Contract

}
export const ContractRenderRowActionsMenuItems = ({ onSelected, deleteItem, row }: Props): ReactNode[] => {
    return [
        <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.READ} key="view">
            <RenderRowActionMenuItem
                item={{
                    name: "Visualizar",
                    icon: "eyeBold",
                    href: paths.dashboard.contracts.view(row.id)
                }}
            />
        </PermissionGuard>,

        <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.EDIT} key="edit">
            {
                (row.status.petTravel === "pending" || row.status.petTravel === "in-process") &&
                <RenderRowActionMenuItem
                    item={{
                        name: "Editar",
                        icon: "editTable",
                        href: paths.dashboard.contracts.edit(row.id)
                    }}
                />
            }
        </PermissionGuard>,

        <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.DELETE} key="remove">
            {(row.status.petTravel === "pending" || row.status.petTravel === "in-process") &&
                <RenderRowActionMenuItemButton<Contract>
                    item={{
                        name: "Eliminar",
                        icon: "removeBox",
                    }}
                    row={row}
                    onSelected={(value) => {
                        onSelected(value);
                        deleteItem();
                    }}
                />
            }
        </PermissionGuard>
    ]
}
