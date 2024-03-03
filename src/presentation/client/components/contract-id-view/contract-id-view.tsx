import ContractDetails from '../../../../presentation/contracts/components/details/contract-detail';
import SearchIdNotFound from '../../../../app/routes/guard/search-id-not-found';
import { useSearchByIdContract } from '../../../contracts/hooks/use-search-by-id-contract';

type Props = {
    id: string;
}

export default function ContractIdView({ id }: Props) {
    const { contract, error, isLoading } = useSearchByIdContract(id);

    return (
        <SearchIdNotFound isLoading={isLoading} data={!!contract} error={error}>
            <ContractDetails contract={contract!} />
        </SearchIdNotFound>
    );
}

