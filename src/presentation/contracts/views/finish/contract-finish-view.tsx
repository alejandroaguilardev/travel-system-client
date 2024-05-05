import { Button, Container, MenuItem } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { RouterLink } from '../../../../app/routes/components';
import { useSelectedValue } from '../../../../hooks';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { ContractTable } from '../../components/table/contract-table';
import { PermissionGuard } from '../../../permission/components/guard/permission-guard';
import { AuthGroup, AuthPermission } from '../../../../modules/auth/domain/auth-permission';
import { useState } from 'react';
import { CONTRACT_SORT_PENDING_DEFAULT, CONTRACT_STATUS_IN_COURSE } from '../../helpers/column-query-filters-status';
import { FinishContract } from '../../components/finish/finish-contract';
import { IconWrapper } from 'src/components/icon-wrapper';
import { CancelContract } from '../../components/finish/cancel-contract';

export default function ContractFinishView() {
    const { selected, handleSelected } = useSelectedValue<Contract>();
    const [cancel, setCancel] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const callback = () => {
        handleSelected(null);
    }

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Contratos por finalizar"
                links={[
                    { name: 'Contratos', href: paths.dashboard.contracts.root },
                    {
                        name: 'Listado',
                    }
                ]}
                action={
                    <PermissionGuard group={AuthGroup.CONTRACTS} permission={AuthPermission.CREATE}>
                        <Button
                            component={RouterLink}
                            href={paths.dashboard.contracts.new}
                            variant="contained"
                        >
                            Nuevo Contrato
                        </Button>
                    </PermissionGuard>
                }
            />
            {!isLoading && <ContractTable
                options={{
                    columnQueryFilters: [
                        ...CONTRACT_STATUS_IN_COURSE,
                    ],
                    sortingQueryFilters: [...CONTRACT_SORT_PENDING_DEFAULT],
                    renderRowActionMenuItems: (row) => [
                        <MenuItem key="finish" onClick={() => {
                            handleSelected(row);
                            setCancel(false);
                        }}>
                            <IconWrapper icon="infoFill" mr={2} />
                            Finalizar
                        </MenuItem >,
                        <MenuItem key="cancel" onClick={() => {
                            handleSelected(row);
                            setCancel(true);
                        }}>
                            <IconWrapper icon="infoFill" mr={2} />
                            Cancelar
                        </MenuItem >,
                    ]
                }}
            />}

            {selected && !cancel &&
                <FinishContract
                    open={!!selected}
                    onClose={() => handleSelected(null)}
                    setLoading={setIsLoading}
                    contract={selected}
                    callback={callback}
                    onCancel={() => handleSelected(null)}
                />
            }

            {selected && cancel &&
                <CancelContract
                    open={!!selected}
                    onClose={() => handleSelected(null)}
                    setLoading={setIsLoading}
                    contract={selected}
                    callback={callback}
                    onCancel={() => handleSelected(null)}
                />
            }

        </Container>
    );
}
