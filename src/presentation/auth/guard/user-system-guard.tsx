import { useAuthContext } from '../hooks';
import NotFoundPage from '../../../app/pages/404';

type Props = {
    children: React.ReactNode;
};

export default function UserSystemGuard({ children }: Props) {
    const { user } = useAuthContext();



    if (user?.roles.length === 0) return <NotFoundPage />

    return <>{children}</>;
}
