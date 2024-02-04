import { useEffect } from 'react';
import { Box, Button, Container, Link } from '@mui/material';
import { SelectedContract } from '../components/contract/selected-contract';
import { useQueryContract } from '../hooks/use-query-contract-client';
import { useContractStore } from '../../../state/contract/contract-store';
import NotFoundContract from '../components/contract/not-fount-contract';
import { ListContract } from '../components/contract/list-contract';
import RouterLink from '../../../app/routes/components/router-link';
import { paths } from '../../../app/routes/paths';
import IconWrapper from '../../../components/icon-wrapper/icon-wrapper';
import LoadingScreen from '../../../components/loading-screen/loading-screen';

export default function ClientView() {
    const { contract: contracts, error, isLoading } = useQueryContract();

    const { contract, onSelected } = useContractStore();

    useEffect(() => {
        if (!isLoading) {
            onSelected(contracts.length > 0 ? contracts[0] : null);
        }
    }, [contracts, error])

    if (isLoading) return <LoadingScreen />

    return (
        <Container maxWidth='xl'>
            {contract
                ? <>
                    <SelectedContract contract={contract} />
                    <ListContract contracts={contracts} />

                    <Box display="flex" justifyContent="center">
                        <Link component={RouterLink} href={paths.client.history}>
                            <Button variant='outlined' startIcon={<IconWrapper icon="docs" />}>
                                Ver Historial de operaciones
                            </Button>
                        </Link>
                    </Box>
                </>
                : <NotFoundContract />
            }
        </Container>
    );
}
