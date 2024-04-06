import { Button, Container, Dialog, DialogContent, DialogTitle } from '@mui/material';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs/custom-breadcrumbs';
import { paths } from '../../../../app/routes/paths';
import { CONTRACT_STATUS_IN_COURSE } from '../../helpers/column-query-filters-status';
import { useColumnsSenasa } from '../../components/table/columns/use-columns-senasa';
import { ContractTable } from '../../components/table/contract-table';
import { useSelectedValue } from '../../../../hooks/use-selected-value';
import { Contract } from '../../../../modules/contracts/domain/contract';
import { SenasaDocumentsForm } from '../../components/form-documentation/senasa/senasa-documents';
import { AccordionPet } from '../../components/accordion-pet/accordion-pet';
import { DetailInfoProvider, DetailInfoContext } from '../../context/contract-detail-context';

export default function ContractSENASAView() {
    const columns = useColumnsSenasa();
    const { selected, handleSelected } = useSelectedValue<Contract>();

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
            <ContractTable
                options={{
                    columns,
                    columnQueryFilters: [...CONTRACT_STATUS_IN_COURSE],
                    sortingQueryFilters: [{ id: "startDate", desc: true }],
                    renderRowActions: (row) => <Button variant='contained' fullWidth onClick={() => handleSelected(row)}>
                        Gestión
                    </Button>
                }}
            />

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
                                                onCancel={() => handleSelected(null)} />
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
