import { Button, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { useColumnsSenasa } from '../../components/table/columns/use-columns-senasa';
import { ContractTable } from '../../components/table/contract-table';
import { useSelectedValue } from '../../../../hooks/use-selected-value';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { SenasaDocumentsForm } from '../../components/form-documentation/senasa/senasa-documents';
import { AccordionPet } from '../../components/accordion-pet/accordion-pet';
import { DetailInfoProvider, DetailInfoContext } from '../../context/contract-detail-context';
import { useState } from 'react';
import { MRT_ColumnFiltersState } from 'material-react-table';

type Props = {
    columnQueryFilters?: MRT_ColumnFiltersState;
}

export default function ContractSENASAView({ columnQueryFilters = [] }: Props) {
    const columns = useColumnsSenasa();
    const { selected, handleSelected } = useSelectedValue<Contract>();
    const [isLoading, setIsLoading] = useState(false);

    const callback = () => {
        handleSelected(null);
    }

    return (
        <Container maxWidth='xl'>
            <CustomBreadcrumbs
                heading="Inspección SENASA"
                links={[
                    { name: 'SENASA', href: paths.dashboard.contracts.root },
                    {
                        name: 'Listado',
                    }
                ]}
            />

            {!isLoading && <ContractTable
                options={{
                    columns,
                    columnQueryFilters: [
                        ...columnQueryFilters,
                        {
                            id: "details.documentation.senasaDocuments.hasServiceIncluded",
                            value: true
                        }
                    ],
                    sortingQueryFilters: [{ id: "startDate", desc: true }],
                    renderRowActions: (row) => <Button variant='contained' fullWidth onClick={() => handleSelected(row)}>
                        Gestión
                    </Button>
                }}
            />}

            {selected &&
                <Dialog open={!!selected} onClose={() => handleSelected(null)} maxWidth="md" fullWidth>
                    <DialogTitle mx={2} my={0} textAlign="center"> {selected.folder} {selected.number}</DialogTitle>
                    <DialogContent sx={{ p: 5 }}>
                        <DetailInfoProvider defaultContract={selected}>
                            <DetailInfoContext.Consumer>
                                {({ contract }) => <>
                                    {contract.details?.map((detail, index) => (
                                        <AccordionPet detail={detail} key={detail.id} index={index}>
                                            <SenasaDocumentsForm
                                                contractId={selected.id}
                                                detail={detail}
                                                callback={callback}
                                                onCancel={() => handleSelected(null)}
                                                setIsLoading={setIsLoading}
                                                status={contract.status}
                                            />

                                        </AccordionPet>
                                    ))}
                                </>
                                }
                            </DetailInfoContext.Consumer>
                        </DetailInfoProvider>

                    </DialogContent>
                </Dialog>
            }
        </Container>
    );
}
