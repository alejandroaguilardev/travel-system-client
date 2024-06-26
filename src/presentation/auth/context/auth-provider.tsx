import { useEffect, useReducer, useCallback, useMemo } from 'react';
import { authLogin } from '../../../modules/auth/application/login/auth-login';
import { authService } from '../../../modules/auth/infrastructure/auth.service';
import { LOCAL_STORAGE_KEYS } from '../../../modules/shared/infrastructure/persistence/local-storage';
import { manageAccessToken } from '../../../modules/auth/infrastructure/session';
import { authVerify } from '../../../modules/auth/application/verify/auth-verify';
import { AuthStateType, Types } from '../types';
import { AuthReducer } from './auth-reducer';
import { AuthContext } from './auth-context';
import { User } from '../../../modules/users/domain/user';

type Props = {
  children: React.ReactNode;
};

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

// Define the interval for token refresh (e.g., 55 minutes)
const TOKEN_REFRESH_INTERVAL = 55 * 60 * 1000; // 55 minutes

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);
      manageAccessToken(accessToken);
      const user = await authVerify(authService, manageAccessToken)(accessToken);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user,
        },
      });
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
    const interval = setInterval(initialize, TOKEN_REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [initialize]);

  const login = useCallback(async (document: string, documentNumber: string, password: string, tokenReCaptcha: string) => {
    try {
      const user = await authLogin(authService, manageAccessToken)(document, documentNumber, password, tokenReCaptcha);
      dispatch({
        type: Types.LOGIN,
        payload: {
          user,
        },
      });
      return user;
    } catch (error) {
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    manageAccessToken(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const update = useCallback(async (user: User) => {
    dispatch({
      type: Types.UPDATE,
      payload: {
        user,
      },
    });
  }, []);

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      logout,
      update,
    }),
    [login, logout, state.user, status, update]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
