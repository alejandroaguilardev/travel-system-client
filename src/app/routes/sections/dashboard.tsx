import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '../../../layouts/dashboard/layout';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import { AuthGuard } from '../../../presentation/auth/guard';
import UserSystemGuard from '../../../presentation/auth/guard/user-system-guard';

const DashboardPage = lazy(() => import('../../pages/admin/index'));

const PermissionPage = lazy(() => import('../../pages/admin/permission'));
const PermissionNewPage = lazy(() => import('../../pages/admin/permission/crear'));
const PermissionIdPage = lazy(() => import('../../pages/admin/permission/[id]/index'));

const RolePage = lazy(() => import('../../pages/admin/role'));
const RoleNewPage = lazy(() => import('../../pages/admin/role/crear'));
const RoleIdPage = lazy(() => import('../../pages/admin/role/[id]/index'));

const UserPage = lazy(() => import('../../pages/admin/user'));
const UserNewPage = lazy(() => import('../../pages/admin/user/crear'));
const UserIdPage = lazy(() => import('../../pages/admin/user/[id]/index'));

const ContractPage = lazy(() => import('../../pages/admin/contract/index'));
const ContractNewPage = lazy(() => import('../../pages/admin/contract/crear'));
const ContractIdPage = lazy(() => import('../../pages/admin/contract/[id]/index'));

const CagePage = lazy(() => import('../../pages/admin/cage/index'));
const CageNewPage = lazy(() => import('../../pages/admin/cage/crear'));
const CageIdPage = lazy(() => import('../../pages/admin/cage/[id]/index'));

const ClientPage = lazy(() => import('../../pages/admin/client'));
const ClientNewPage = lazy(() => import('../../pages/admin/client/crear'));
const ClientIdPage = lazy(() => import('../../pages/admin/client/[id]/index'));

const PetsPage = lazy(() => import('../../pages/admin/pet'));
const PetsNewPage = lazy(() => import('../../pages/admin/pet/crear'));
const PetsIdPage = lazy(() => import('../../pages/admin/pet/[id]/index'));

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <UserSystemGuard>
          <DashboardLayout>
            <Suspense fallback={<LoadingScreen />}>
              <Outlet />
            </Suspense>
          </DashboardLayout>
        </UserSystemGuard>
      </AuthGuard>
    ),
    children: [
      { element: <DashboardPage />, index: true },
      {
        path: 'contratos',
        children: [
          { element: <ContractPage />, index: true },
          { path: 'crear', element: <ContractNewPage /> },
          { path: ':id/:action', element: <ContractIdPage /> },
        ],
      },
      {
        path: 'clientes',
        children: [
          { element: <ClientPage />, index: true },
          { path: 'crear', element: <ClientNewPage /> },
          { path: ':id/:action', element: <ClientIdPage /> },
        ],
      },
      {
        path: 'mascotas',
        children: [
          { element: <PetsPage />, index: true },
          { path: 'crear', element: <PetsNewPage /> },
          { path: ':id/:action', element: <PetsIdPage /> },
        ],
      },
      {
        path: 'jaulas',
        children: [
          { element: <CagePage />, index: true },
          { path: 'crear', element: <CageNewPage /> },
          { path: ':id/:action', element: <CageIdPage /> },
        ],
      },
      {
        path: 'usuarios/roles',
        children: [
          { element: <RolePage />, index: true },
          { path: 'crear', element: <RoleNewPage /> },
          { path: ':id/:action', element: <RoleIdPage /> },
        ],
      },
      {
        path: 'usuarios/permisos',
        children: [
          { element: <PermissionPage />, index: true },
          { path: 'crear', element: <PermissionNewPage /> },
          { path: ':id/:action', element: <PermissionIdPage /> },
        ],
      },
      {
        path: 'usuarios',
        children: [
          { element: <UserPage />, index: true },
          { path: 'crear', element: <UserNewPage /> },
          { path: ':id/:action', element: <UserIdPage /> },
        ],
      },
    ],
  },
];
