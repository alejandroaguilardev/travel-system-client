import { User } from '../../modules/users/domain/user';

export type AuthContextType = {
  user: User | null;
  method: string;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  update: (user: User) => void;
};

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
  ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  };
};

export type AuthUserType = User | null;

export type AuthStateType = {
  status?: string;
  loading: boolean;
  user: AuthUserType;
};

export enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  UPDATE = 'UPDATE',
}
