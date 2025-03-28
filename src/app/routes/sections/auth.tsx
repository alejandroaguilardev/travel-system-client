import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import SplashScreen from '../../../components/loading-screen/splash-screen';
import AuthClassicLayout from '../../../layouts/auth/classic';
import { GuestGuard } from '../../../presentation/auth/guard';

const LoginPage = lazy(() => import('../../pages/auth'));
const RecoverPage = lazy(() => import('../../pages/auth/recover'));
const ResetPasswordPage = lazy(() => import('../../pages/auth/[id]/reset-password'));

export const authRoutes = [
  {
    path: '/auth',
    children: [{
      element: (
        <GuestGuard>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </GuestGuard>
      ),
      children: [
        {
          path: 'login',
          element: (
            <AuthClassicLayout>
              <LoginPage />
            </AuthClassicLayout>
          ),
        },

        {
          path: 'recuperar',
          children: [
            { element: <AuthClassicLayout><RecoverPage /></AuthClassicLayout>, index: true },
            { path: ':token', element: <AuthClassicLayout><ResetPasswordPage /></AuthClassicLayout> },
          ],
        },
      ],
    }],
  },
];
