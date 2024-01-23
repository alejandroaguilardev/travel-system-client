import { Navigate, useRoutes } from 'react-router-dom';

import { PATH_AFTER_LOGIN, PATH_AFTER_LOGIN_CLIENT } from '../../../app/config/config-global';
import { useAuthContext } from '../../../presentation/auth/hooks/use-auth-context';

import { mainRoutes } from './main';

import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';
import { clientsRoutes } from './client';


export default function Router() {
  const { user } = useAuthContext();

  return useRoutes([
    {
      path: '/',
      element: <Navigate to={user && user?.roles?.length > 0 ? PATH_AFTER_LOGIN : PATH_AFTER_LOGIN_CLIENT} replace />,
    },
    ...clientsRoutes,
    ...authRoutes,

    ...dashboardRoutes,

    ...mainRoutes,

    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
