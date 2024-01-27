import { ReactNode } from 'react';
import { RenderRowActionMenuItemButton } from 'src/components/material-table/render-row-action-menu-item-button';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { paths } from '../../../../app/routes/paths';

type Props = {
    onSelected: (contract: Contract) => void;
    deleteItem: () => void;
    row: Contract

}


export const ContractRenderRowActionsMenuItems = ({ onSelected, deleteItem, row }: Props): ReactNode[] => {
    return [<RenderRowActionMenuItem
        item={{
            name: "Visualizar",
            icon: "eyeBold",
            href: paths.dashboard.contracts.view(row.id)
        }}
        key="view"
    />,
    <RenderRowActionMenuItem
        item={{
            name: "Editar",
            icon: "editTable",
            href: paths.dashboard.contracts.edit(row.id)
        }}
        key="edit"
    />,
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
        key="remove"
    />]
}
