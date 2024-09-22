import React from 'react';
import { Box, Button } from '@mui/material';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { TabGenericProvider } from '../../../../components/tab-generic/context/tab-generic-provider';
import { TabSwitcher } from '../../../../components/tab-generic/tab-switcher';
import { DetailInfoProvider } from '../../context/contract-detail-context';
import { useRouter } from '../../../../app/routes/hooks/use-router';
import { tabs } from './tabs';


interface ContractDetailsProps {
    contract: Contract;
}

const ContractDetails: React.FC<ContractDetailsProps> = ({ contract }) => {
    const { back } = useRouter();

    return (
        <DetailInfoProvider defaultContract={contract}>
            <TabGenericProvider defaultValue={tabs[0].value}>
                <TabSwitcher
                    tabs={tabs}
                />
            </TabGenericProvider>


            <Box width="100%" display="flex" justifyContent="center">
                <Button variant="outlined" onClick={back}>
                    Volver Atrás
                </Button>
            </Box>
        </DetailInfoProvider>
    );
};

export default ContractDetails;
