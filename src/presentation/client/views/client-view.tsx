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
    const { contract: contracts, isLoading } = useQueryContract();

    const { contract, contractDetail, onSelected, onSelectedDetail } = useContractStore();

    useEffect(() => {
        if (!isLoading) {
            onSelected(contracts.length > 0 ? contracts[0] : null);
        }
    }, [isLoading, contracts]);

    useEffect(() => {
        if (!isLoading) {
            if (contracts.length > 0) {
                onSelectedDetail(contracts[0].details.length > 0 ? contracts[0].details[0] : null);
            } else {
                onSelectedDetail(null);
            }
        }
    }, [isLoading])

    if (isLoading) return <LoadingScreen />

    return (
        <Container maxWidth='xl'>
            {contract && contractDetail
                ? <>
                    <SelectedContract
                        contract={contract}
                        contractDetail={contractDetail}
                    />

                    <ListContract contracts={contracts} />

                    <Box display="flex" justifyContent="center">
                        <Link component={RouterLink} href={paths.client.history}>
                            <Button variant='outlined' startIcon={<IconWrapper icon="docs" />}>
                                Ver historial de servicios
                            </Button>
                        </Link>
                    </Box>
                </>
                : <NotFoundContract />
            }
        </Container>
    );
}
