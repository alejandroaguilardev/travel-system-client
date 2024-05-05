import { Button, Container, Dialog, DialogContent, DialogTitle, Skeleton } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { useColumnsSenasa } from '../../components/table/columns/use-columns-senasa';
import { ContractTable } from '../../components/table/contract-table';
import { SenasaDocumentsForm } from '../../components/form-documentation/senasa/senasa-documents';
import { AccordionPet } from '../../components/accordion-pet/accordion-pet';
import { DetailInfoProvider, DetailInfoContext } from '../../context/contract-detail-context';
import { useState } from 'react';
import { MRT_ColumnFiltersState } from 'material-react-table';
import { useSelectedContract } from '../../hooks/use-selected-contract';
import { CONTRACT_SORT_PENDING_DEFAULT } from '../../helpers/column-query-filters-status';

type Props = {
    columnQueryFilters?: MRT_ColumnFiltersState;
    title: string;
}

export default function ContractSENASAView({ columnQueryFilters = [], title }: Props) {
    const columns = useColumnsSenasa();
    const { selected, handleSelected, isLoading, open, setOpen } = useSelectedContract();
    const [isLoadingTable, setIsLoadingTable] = useState(false);

    const callback = () => {
        handleSelected(null);
        setOpen(false);
    }

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading={title}
                links={[
                    { name: 'SENASA', href: paths.dashboard.contracts.root },
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
                            id: "details.documentation.senasaDocuments.hasServiceIncluded",
                            value: true
                        }
                    ],
                    sortingQueryFilters: [...CONTRACT_SORT_PENDING_DEFAULT],
                    renderRowActions: (row) => <Button variant='contained' fullWidth onClick={() => {
                        setOpen(true);
                        handleSelected(row);
                    }}>
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
                                            <SenasaDocumentsForm
                                                contractId={selected.id}
                                                detail={detail}
                                                callback={callback}
                                                onCancel={() => { handleSelected(null); setOpen(false) }}
                                                setIsLoading={setIsLoadingTable}
                                                status={contract.status.petTravel}
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
