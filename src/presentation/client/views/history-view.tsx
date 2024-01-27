import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { RouterLink } from '../../../app/routes/components';
import { useSelectedValue } from '../../../hooks';
import { Contract } from '../../../modules/contracts/domain/contract';
import { ContractTable } from '../../contracts/components/table/contract-table';
import IconWrapper from '../../../components/icon-wrapper/icon-wrapper';
import { useAuthContext } from '../../auth/hooks/use-auth-context';



export default function HistoryView() {
    const { user } = useAuthContext();
    const { selected, handleSelected } = useSelectedValue<Contract>();

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Historial de Servicios"
                links={[
                    { name: 'Inicio', href: paths.root },
                    {
                        name: 'Operaciones',
                    }
                ]}
                action={

                    <Button
                        component={RouterLink}
                        href={paths.root}
                        variant="outlined"
                        startIcon={<IconWrapper icon="arrowheadLeftFill" />}
                    >
                        Volver al Inicio
                    </Button>
                }
            />
            <ContractTable
                options={{
                    columnQueryFilters: [{ id: "client", value: user?.id }],
                    sortingQueryFilters: [{ id: "createdAt", desc: true }]
                }}
            />
        </Container>
    );
}
