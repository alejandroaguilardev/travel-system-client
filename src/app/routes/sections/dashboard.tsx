import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '../../../layouts/dashboard/layout';
import LoadingScreen from '../../../components/loading-screen/loading-screen';
import { AuthGuard } from '../../../presentation/auth/guard';
import UserSystemGuard from '../../../presentation/auth/guard/user-system-guard';
import { NotFoundView } from '../../../presentation/error';

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

const ContractAssignNumber = lazy(() => import('../../pages/admin/contract/asignar-numero/index'));
const ContractAssignPetPage = lazy(() => import('../../pages/admin/contract/assign-pet/index'));
const ContractListPaymentPage = lazy(() => import('../../pages/admin/contract/payment/index'));
const ContractIdPage = lazy(() => import('../../pages/admin/contract/[id]/index'));

const ContractSENASAPage = lazy(() => import('../../pages/admin/contract/senasa/index'));
const ContractTestRabiesPage = lazy(() => import('../../pages/admin/contract/test-serologico-rabies/index'));
const ContractDocumentationPage = lazy(() => import('../../pages/admin/contract/documentation/index'));
const ContractDocumentationUpdatePage = lazy(() => import('../../pages/admin/contract/documentation/management/index'));
const ContractTopicoPage = lazy(() => import('../../pages/admin/contract/topico/index'));
const ContractTopicoManagementPage = lazy(() => import('../../pages/admin/contract/topico/management/index'));

const ContractCage = lazy(() => import('../../pages/admin/contract/cage/index'));
const ContractUpdateCage = lazy(() => import('../../pages/admin/contract/cage/[id]/index'));
const ContractTravel = lazy(() => import('../../pages/admin/contract/travel/index'));
const ContractUpdateTravel = lazy(() => import('../../pages/admin/contract/travel/[id]/index'));
const ContractFinish = lazy(() => import('../../pages/admin/contract/finish/index'));

const SENASAHistory = lazy(() => import('../../pages/admin/contract/senasa/history'));
const TestRabiesHistory = lazy(() => import('../../pages/admin/contract/test-serologico-rabies/history'));

const CagePage = lazy(() => import('../../pages/admin/cage/index'));
const CageNewPage = lazy(() => import('../../pages/admin/cage/crear'));
const CageIdPage = lazy(() => import('../../pages/admin/cage/[id]/index'));

const ClientPage = lazy(() => import('../../pages/admin/client'));
const ClientNewPage = lazy(() => import('../../pages/admin/client/crear'));
const ClientIdPage = lazy(() => import('../../pages/admin/client/[id]/index'));

const PetsPage = lazy(() => import('../../pages/admin/pet'));
const PetsNewPage = lazy(() => import('../../pages/admin/pet/crear'));
const PetsIdPage = lazy(() => import('../../pages/admin/pet/[id]/index'));

const FoldersPage = lazy(() => import('../../pages/admin/folders'));
const FoldersNewPage = lazy(() => import('../../pages/admin/folders/new'));
const FoldersIdPage = lazy(() => import('../../pages/admin/folders/[id]/index'));

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
        path: 'contratos-jaulas',
        children: [
          { element: <ContractCage />, index: true },
          { path: ':id', element: <ContractUpdateCage /> },
        ],
      },
      {
        path: 'contratos-reservas',
        children: [
          { element: <ContractTravel />, index: true },
          { path: ':id', element: <ContractUpdateTravel /> },
        ],
      },
      { path: 'historial-senasa', element: <SENASAHistory /> },
      { path: 'historial-test-serologico-rabia', element: <TestRabiesHistory /> },

      {
        path: 'contratos',
        children: [
          { element: <ContractPage />, index: true },
          { path: 'crear', element: <ContractNewPage /> },
          { path: 'asignar-numero', element: <ContractAssignNumber /> },
          { path: 'seleccionar-mascota', element: <ContractAssignPetPage /> },
          { path: 'pagos', element: <ContractListPaymentPage /> },
          { path: ':id/:action', element: <ContractIdPage /> },
        ],
      },
      {
        path: 'fase-documentacion',
        children: [
          { element: <NotFoundView />, index: true },
          { path: 'topico', element: <ContractTopicoPage /> },
          { path: 'topico/:id/:action/gestion', element: <ContractTopicoManagementPage /> },
          { path: 'documentacion', element: <ContractDocumentationPage /> },
          { path: 'documentacion/:id/:action/gestion', element: <ContractDocumentationUpdatePage /> },
          { path: 'inspeccion-senasa', element: <ContractSENASAPage /> },
          { path: 'test-serologico-rabia', element: <ContractTestRabiesPage /> },
          { path: 'contratos', element: <ContractFinish /> },
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
        path: 'expedientes',
        children: [
          { element: <FoldersPage />, index: true },
          { path: 'crear', element: <FoldersNewPage /> },
          { path: ':id/:action', element: <FoldersIdPage /> },
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
