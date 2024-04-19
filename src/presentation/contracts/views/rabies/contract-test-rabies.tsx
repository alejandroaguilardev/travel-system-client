import { Button, Container, Dialog, DialogContent, DialogTitle, Skeleton } from '@mui/material';
import { MRT_ColumnFiltersState } from 'material-react-table';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { useColumnsRabies } from '../../components/table/columns/use-columns-rabies';
import { ContractTable } from '../../components/table/contract-table';
import { RabiesTestSerologicalForm } from '../../components/form-documentation/rabies/rabies-sero-logical-test';
import { AccordionPet } from '../../components/accordion-pet/accordion-pet';
import { DetailInfoProvider, DetailInfoContext } from '../../context/contract-detail-context';
import { useState } from 'react';
import { useSelectedContract } from '../../hooks/use-selected-contract';

type Props = {
    columnQueryFilters?: MRT_ColumnFiltersState;
}

export default function ContractTestRabiesView({ columnQueryFilters = [] }: Props) {
    const columns = useColumnsRabies();
    const { selected, handleSelected, isLoading, open, setOpen } = useSelectedContract();
    const [isLoadingTable, setIsLoadingTable] = useState(false);


    const callback = () => {
        handleSelected(null);
        setOpen(true);
    }

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Test serológico de rabia"
                links={[
                    { name: 'Test serológico de rabia', href: paths.dashboard.contracts.root },
                    {
                        name: 'Listado',
                    }
                ]}
            />

            {!isLoadingTable && <ContractTable
                options={{
                    columns,
                    columnQueryFilters: [
                        ...columnQueryFilters,
                        {
                            id: "details.documentation.rabiesSeroLogicalTest.hasServiceIncluded",
                            value: true
                        }
                    ],
                    sortingQueryFilters: [{ id: "startDate", desc: true }],
                    renderRowActions: (row) => <Button variant='contained' fullWidth onClick={() => { setOpen(true); handleSelected(row) }}>
                        Gestión
                    </Button>
                }}
            />}

            <Dialog open={open} onClose={() => { handleSelected(null); setOpen(false) }} maxWidth="md" fullWidth>

                <DialogContent sx={{ p: 5 }}>
                    {!!selected && !isLoading ?
                        <DetailInfoProvider defaultContract={selected}>
                            <DialogTitle mx={2} my={0} textAlign="center"> {selected.folder} {selected.number}</DialogTitle>
                            <DetailInfoContext.Consumer>
                                {({ contract }) => <>
                                    {contract.details?.map((detail, index) => (
                                        <AccordionPet detail={detail} key={detail.id} index={index}>
                                            <RabiesTestSerologicalForm
                                                contractId={selected.id}
                                                detail={detail}
                                                callback={callback}
                                                onCancel={() => handleSelected(null)}
                                                setIsLoading={setIsLoadingTable}
                                                status={contract.status}
                                            />

                                        </AccordionPet>
                                    ))}
                                </>
                                }
                            </DetailInfoContext.Consumer>
                        </DetailInfoProvider>
                        : <>
                            <Skeleton variant='rectangular' height={60} sx={{ mb: 3 }} />
                            <Skeleton variant='rectangular' height={320} />
                        </>
                    }
                </DialogContent>
            </Dialog>
        </Container>
    );
}
