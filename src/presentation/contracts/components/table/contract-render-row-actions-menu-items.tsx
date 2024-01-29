import { ReactNode } from 'react';
import { MenuItem } from '@mui/material';
import { RenderRowActionMenuItemButton } from '../../../../components/material-table/render-row-action-menu-item-button';
import { RenderRowActionMenuItem } from '../../../../components/material-table/render-row-action-menu-item';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { paths } from '../../../../app/routes/paths';
import { useFinish } from '../../hooks/use-finish';
import IconWrapper from '../../../../components/icon-wrapper/icon-wrapper';
import { useRouter } from '../../../../app/routes/hooks/use-router';

type Props = {
    onSelected: (contract: Contract) => void;
    deleteItem: () => void;
    row: Contract

}
export const ContractRenderRowActionsMenuItems = ({ onSelected, deleteItem, row }: Props): ReactNode[] => {
    const { reload } = useRouter();

    const { handleFinishClick } = useFinish({ contract: row, callback: () => reload() });

    return [<RenderRowActionMenuItem
        item={{
            name: "Visualizar",
            icon: "eyeBold",
            href: paths.dashboard.contracts.view(row.id)
        }}
        key="view"
    />,
    <>
        {row.status === "completed" && !row.endDate &&
            <MenuItem
                onClick={handleFinishClick}
                key="finish"
            >
                <IconWrapper icon="check" mr={2} />
                Finalizar
            </MenuItem>
        }

        {row.status !== "completed" && <RenderRowActionMenuItem
            item={{
                name: "Editar",
                icon: "editTable",
                href: paths.dashboard.contracts.edit(row.id)
            }}
            key="edit"
        />
        }
    </>,
    <RenderRowActionMenuItem
        item={{
            name: "Documentation",
            icon: "eyeBold",
            href: paths.dashboard.contracts.documentation(row.id)
        }}
        key="documentation"
    />,
    <RenderRowActionMenuItem
        item={{
            name: "Requisitos de Jaula",
            icon: "eyeBold",
            href: paths.dashboard.contracts.cage(row.id)
        }}
        key="cage"
    />,
    <RenderRowActionMenuItem
        item={{
            name: "Requisitos de Viaje",
            icon: "eyeBold",
            href: paths.dashboard.contracts.travel(row.id)
        }}
        key="travel"
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
