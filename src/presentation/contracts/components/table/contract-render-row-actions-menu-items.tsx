import { Fragment, ReactNode } from 'react';
import { MenuItem } from '@mui/material';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { paths } from '../../../../app/routes/paths';
import { useFinish } from '../../hooks/use-finish';
import IconWrapper from '../../../../components/icon-wrapper/icon-wrapper';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';

type Props = {
    onSelected: (contract: Contract) => void;
    deleteItem: () => void;
    row: Contract

}
export const ContractRenderRowActionsMenuItems = ({ onSelected, deleteItem, row }: Props): ReactNode[] => {
    const { reload } = useRouter();

    const { handleFinishClick } = useFinish({ contract: row, callback: () => reload() });

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
        <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.FINISH} key="finish">
            {row.status === "completed" && !row.endDate &&
                <MenuItem
                    onClick={handleFinishClick}
                >
                    <IconWrapper icon="check" mr={2} />
                    Finalizar
                </MenuItem>
            }
        </PermissionGuard>,

        <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.EDIT} key="edit">
            {
                row.status !== "completed" &&
                <RenderRowActionMenuItem
                    item={{
                        name: "Editar",
                        icon: "editTable",
                        href: paths.dashboard.contracts.edit(row.id)
                    }}
                />
            }
        </PermissionGuard>,
        <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.DOCUMENTATION} key="documentation">
            <RenderRowActionMenuItem
                item={{
                    name: "Documentation",
                    icon: "eyeBold",
                    href: paths.dashboard.contracts.documentation(row.id)
                }}
            />
        </PermissionGuard>,
        <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.CAGE} key="cage">
            <RenderRowActionMenuItem
                item={{
                    name: "Requisitos de Jaula",
                    icon: "eyeBold",
                    href: paths.dashboard.contracts.cage(row.id)
                }}
                key="cage"
            />
        </PermissionGuard>,
        <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.TRAVEL} key="travel">
            <RenderRowActionMenuItem
                item={{
                    name: "Requisitos de Viaje",
                    icon: "eyeBold",
                    href: paths.dashboard.contracts.travel(row.id)
                }}
            />
        </PermissionGuard>,
        <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.DELETE} key="remove">
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
        </PermissionGuard>
    ]
}
