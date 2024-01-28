import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ClientLayout from '../../../layouts/client/layout';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import { AuthGuard } from '../../../presentation/auth/guard';

const ClientPage = lazy(() => import('../../pages/client'));
const HistoryPage = lazy(() => import('../../pages/client/history'));

export const clientsRoutes = [
    {
        path: '/',
        element: (
            <AuthGuard>
                <ClientLayout>
                    <Suspense fallback={<LoadingScreen />}>
                        <Outlet />
                    </Suspense>
                </ClientLayout>
            </AuthGuard>
        ),
        children: [
            { element: <ClientPage />, index: true },
            {
                path: 'historial',
                children: [
                    { element: <HistoryPage />, index: true },
                ],
            },
        ],
    },
];
