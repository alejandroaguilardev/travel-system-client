import { Button, Container } from '@mui/material';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../app/routes/paths';
import { RouterLink } from '../../../app/routes/components';
import IconWrapper from '../../../components/icon-wrapper/icon-wrapper';
import { useContractStore } from '../../../state/contract/contract-store';
import { useEffect } from 'react';
import { ContractClientTable } from '../../contracts/components/table/contract-client-table';

export default function HistoryView() {
    const { onSelected } = useContractStore();

    useEffect(() => {
        onSelected(null);
    }, [onSelected])

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

            <ContractClientTable
                options={{
                    sortingQueryFilters: [{ id: "startDate", desc: true }]
                }}
            />
        </Container>
    );
}
