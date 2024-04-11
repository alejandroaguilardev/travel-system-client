import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import ClientLayout from '../../../layouts/client/layout';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import { AuthGuard } from '../../../presentation/auth/guard';

const ClientPage = lazy(() => import('../../pages/client'));
const ClientProfile = lazy(() => import('../../pages/client/profile/index'));
const ClientSecurity = lazy(() => import('../../pages/client/security/index'));

const HistoryPage = lazy(() => import('../../pages/client/history'));
const AccompaniedPage = lazy(() => import('../../pages/client/travel/[id]/index'));

export const clientsRoutes = [
    {
        path: '/',
        element: (
            <Suspense fallback={<LoadingScreen />}>
                <Outlet />
            </Suspense>
        ),
        children: [
            { element: <ClientLayout><AuthGuard><ClientPage /></AuthGuard></ClientLayout>, index: true },
            {
                path: 'historial',
                children: [
                    { element: <ClientLayout><AuthGuard><HistoryPage /></AuthGuard></ClientLayout>, index: true },
                ],
            },
            {
                path: 'perfil',
                children: [
                    { element: <ClientLayout><AuthGuard><ClientProfile /></AuthGuard></ClientLayout>, index: true },
                ],
            },
            {
                path: 'seguridad',
                children: [
                    { element: <ClientLayout><AuthGuard><ClientSecurity /></AuthGuard></ClientLayout>, index: true },
                ],
            },
            {
                path: 'viaje/:contractId/:contractDetailId/:token',
                children: [
                    { element: <AccompaniedPage />, index: true },
                ],
            },
        ],
    },
];